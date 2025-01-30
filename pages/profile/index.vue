<template>
    <main class="w-full px-5 md:px-24 py-8">
        <div class="max-w-4xl mx-auto">
            <!-- Profil Başlığı -->
            <div class="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-8">
                <div class="flex flex-col md:flex-row items-center gap-6">
                    <!-- Profil Resmi -->
                    <div class="relative group">
                        <img 
                            :src="user?.profile_image || `https://ui-avatars.com/api/?name=${user?.name}&background=random`" 
                            class="w-32 h-32 rounded-full object-cover"
                            alt="Profile"
                        />
                        <div 
                            class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            @click="triggerFileInput"
                        >
                            <i class="pi pi-camera text-white text-2xl"></i>
                        </div>
                        <input 
                            type="file" 
                            ref="fileInput" 
                            class="hidden" 
                            accept="image/*"
                            @change="handleImageUpload"
                        />
                    </div>

                    <!-- Kullanıcı Bilgileri -->
                    <div class="flex-1 text-center md:text-left">
                        <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">
                            {{ user?.name }}
                        </h1>
                        <p class="text-gray-300 mb-4">{{ user?.email }}</p>
                        
                        <!-- İstatistikler -->
                        <div class="flex justify-center md:justify-start gap-6 text-white">
                            <div class="text-center">
                                <div class="text-xl font-bold">{{ userStats.totalPosts }}</div>
                                <div class="text-sm">Blog</div>
                            </div>
                            <div class="text-center">
                                <div class="text-xl font-bold">{{ userStats.totalLikes }}</div>
                                <div class="text-sm">Bəyənmə</div>
                            </div>
                            <div class="text-center">
                                <div class="text-xl font-bold">{{ userStats.totalViews }}</div>
                                <div class="text-sm">Baxış</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Kullanıcının Blogları -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <template v-for="blog in userBlogs" :key="blog.id">
                    <div 
                        class="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                        @click="router.push(`/blog/${blog.slug}`)"
                    >
                        <img 
                            :src="`https://res.cloudinary.com/djfeqtwjx/image/upload/v1734288174/${blog.thumbnail}`"
                            class="w-full h-48 object-cover"
                            :alt="blog.title"
                        />
                        <div class="p-4">
                            <h3 class="text-lg font-semibold text-white mb-2">{{ blog.title }}</h3>
                            <p class="text-gray-300 text-sm line-clamp-2">{{ blog.description }}</p>
                            <div class="flex justify-between items-center mt-4 text-sm text-gray-300">
                                <span class="flex items-center gap-1">
                                    <i class="pi pi-eye"></i>
                                    {{ blog.views }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <i class="pi pi-heart"></i>
                                    {{ blog.likes_count }}
                                </span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <!-- Yükleniyor -->
            <div v-if="loading" class="flex justify-center my-8">
                <ProgressSpinner />
            </div>
        </div>
    </main>
</template>

<script setup>
const { user } = useSanctum();
const router = useRouter();
const nuxtApp = useNuxtApp();
const fileInput = ref(null);
const loading = ref(true);
const userBlogs = ref([]);
const userStats = ref({
    totalPosts: 0,
    totalLikes: 0,
    totalViews: 0
});

// Profil resmi yükleme
function triggerFileInput() {
    fileInput.value.click();
}

async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profile_image', file);

    try {
        const token = await useTokenStorage(nuxtApp).get();
        await $fetch('http://127.0.0.1:8000/api/user/profile-image', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        
        // Profil resmini güncelle
        await refreshNuxtData();
    } catch (error) {
        console.error('Profil resmi yüklenemedi:', error);
    }
}

// Kullanıcı bloglarını getir
async function fetchUserBlogs() {
    try {
        const token = await useTokenStorage(nuxtApp).get();
        const response = await $fetch('http://127.0.0.1:8000/api/user/blogs', {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        userBlogs.value = response.data;
        
        // İstatistikleri hesapla
        userStats.value = {
            totalPosts: userBlogs.value.length,
            totalLikes: userBlogs.value.reduce((acc, blog) => acc + blog.likes_count, 0),
            totalViews: userBlogs.value.reduce((acc, blog) => acc + blog.views, 0)
        };
    } catch (error) {
        console.error('Bloglar yüklenemedi:', error);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchUserBlogs();
});
</script> 