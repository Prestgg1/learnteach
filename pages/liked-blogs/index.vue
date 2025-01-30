<template>
    <main class="md:mt-10 w-full px-5 md:px-24 flex flex-col gap-5">
        <h1 class="font-medium text-2xl md:text-4xl text-white">Bəyənilən Bloglar</h1>

        <!-- Blog Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-3">
            <template v-for="(item, index) in blogs" :key="index">
                <div 
                    class="card flex flex-col m-4 bg-[#D9D9D9] text-black overflow-hidden rounded-[30px] shadow-md h-[300px] md:max-h-[350px] cursor-pointer hover:shadow-lg transition-shadow"
                    @click="router.push(`/blog/${item.slug}`)"
                >
                    <div class="h-[70%] overflow-hidden">
                        <NuxtImg
                            :src="'https://res.cloudinary.com/djfeqtwjx/image/upload/v1734288174/' + item.thumbnail"
                            alt="Blog Image"
                            class="w-full h-full object-cover"
                        />
                    </div>
                    <div class="px-4 py-2 flex justify-between h-[30%]">
                        <div class="flex items-center gap-2">
                            <NuxtImg 
                                :src="item.user.profile_image || `https://ui-avatars.com/api/?name=${item.user.name}&background=random`" 
                                class="w-10 h-10 rounded-full" 
                            />
                            <div>
                                <h3 class="font-medium text-lg line-clamp-1 w-3/4">
                                    {{ item.title }}
                                </h3>
                                <p class="text-gray-500 text-sm mt-2 line-clamp-1">
                                    {{ item.description }}
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col justify-between items-center mt-3">
                            <div class="flex items-center gap-2">
                                <i class="pi pi-eye"></i>
                                <span class="text-sm">{{ item.views || 0 }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="pi pi-heart-fill text-red-500"></i>
                                <span class="text-sm">{{ item.likes_count || 0 }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <!-- Yükleniyor Göstergesi -->
        <div v-if="loading" class="flex justify-center my-4">
            <ProgressSpinner />
        </div>

        <!-- Boş Durum -->
        <div v-if="!loading && blogs.length === 0" class="text-center text-white my-8">
            Hələ heç bir blog bəyənməmisiniz.
        </div>

        <!-- Intersection Observer için hedef element -->
        <div ref="loadMoreTrigger" class="h-4"></div>
    </main>
</template>

<script setup>
definePageMeta({
    middleware: "$auth",
});

const blogs = ref([]);
const loading = ref(false);
const nextPage = ref(1);
const hasMorePages = ref(true);
const router = useRouter();
const loadMoreTrigger = ref(null);
const nuxtApp = useNuxtApp();

// Intersection Observer kurulumu
onMounted(() => {
    const observer = new IntersectionObserver(async ([entry]) => {
        if (entry.isIntersecting && !loading.value && hasMorePages.value) {
            await loadMoreBlogs();
        }
    }, {
        rootMargin: '100px'
    });

    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value);
    }
});

// Blog yükleme fonksiyonu
async function loadMoreBlogs() {
    if (!hasMorePages.value || loading.value) return;

    loading.value = true;
    try {
        const token = await useTokenStorage(nuxtApp).get();
        const response = await $fetch(
            `http://127.0.0.1:8000/api/posts/liked?page=${nextPage.value}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        blogs.value = [...blogs.value, ...response.data.data];
        nextPage.value = response.data.nextPage;
        hasMorePages.value = response.data.hasMorePages;
    } catch (error) {
        console.error("Bloglar Yüklənəmədi:", error);
    } finally {
        loading.value = false;
    }
}

// İlk yükleme
onMounted(() => {
    loadMoreBlogs();
});
</script> 