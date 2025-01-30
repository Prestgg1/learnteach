<template>
    <main class="w-full px-5 md:px-24 py-8">
        <div v-if="blog" class="max-w-4xl mx-auto">
            <!-- Blog Başlık ve Yazar Bilgisi -->
            <div class="mb-8">
                <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ blog.title }}</h1>
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                        <NuxtImg 
                            :src="blog.user.profile_image || `https://ui-avatars.com/api/?name=${blog.user.name}&background=random`" 
                            class="w-12 h-12 rounded-full"
                        />
                        <div>
                            <p class="font-medium">{{ blog.user.name }}</p>
                            <p class="text-sm text-gray-500">{{ new Date(blog.created_at).toLocaleDateString() }}</p>
                        </div>
                    </div>
                    <div class="flex gap-4 ml-auto">
                        <span class="flex items-center gap-1">
                            <i class="pi pi-eye"></i>
                            {{ blog.views || 0 }}
                        </span>
                        <span class="flex items-center gap-1">
                            <i :class="[
                                'pi',
                                isLiked ? 'pi-heart-fill text-red-500' : 'pi-heart'
                            ]"></i>
                            {{ likes || 0 }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Blog Görseli -->
            <div class="mb-8 relative">
                <div 
                    class="relative cursor-pointer"
                    @dblclick="handleDoubleTap"
                >
                    <img 
                        :src="`https://res.cloudinary.com/djfeqtwjx/image/upload/v1734288174/${blog.thumbnail}`"
                        class="w-full h-[400px] object-cover rounded-2xl"
                        :alt="blog.title"
                    />
                    <!-- Kalp Animasyonu -->
                    <Transition name="heart">
                        <div 
                            v-if="showHeart" 
                            class="absolute inset-0 flex items-center justify-center"
                        >
                            <i class="pi pi-heart-fill text-white text-8xl animate-heart"></i>
                        </div>
                    </Transition>
                </div>
            </div>

            <!-- Blog İçeriği -->
            <div class="prose max-w-none">
                <div v-html="blog.content"></div>
            </div>
        </div>

        <!-- Yükleniyor Durumu -->
        <div v-else-if="loading" class="flex justify-center items-center min-h-[50vh]">
            <ProgressSpinner />
        </div>

        <!-- Hata Durumu -->
        <div v-else class="text-center text-red-500">
            Blog tapılmadı
        </div>
    </main>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const { $echo } = useNuxtApp()


console.log($echo)
const route = useRoute();
const blog = ref(null);
const loading = ref(true);
const showHeart = ref(false);
const likes = ref(0);
const isLiked = ref(false);

// Blog verilerini getir
async function fetchBlogData() {
    const response = await $fetch(`http://127.0.0.1:8000/api/post/${route.params.slug}`);
    blog.value = response.data;
    likes.value = blog.value.likes_count;
    
    // Blog yüklendikten sonra beğeni durumunu kontrol et
    if (blog.value) {
        await checkLikeStatus();
        // WebSocket kanalına abone ol
        subscribeToLikes();
    }
}

// Blog ve beğeni durumunu kontrol et
async function checkLikeStatus() {
    try {
        const token = await useTokenStorage(nuxtApp).get();
        const response = await $fetch(`http://127.0.0.1:8000/api/posts/${blog.value.id}/check-like`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        isLiked.value = response.is_liked;
    } catch (error) {
        console.error('Beğeni durumu kontrol edilemedi:', error);
    }
}

// Çift tıklama işleyicisi
async function handleDoubleTap() {
    if (!blog.value) return;

    showHeart.value = true;
    
    try {
        const token = await useTokenStorage(nuxtApp).get();
        const response = await $fetch(`http://127.0.0.1:8000/api/posts/${blog.value.id}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        
        // Verileri yeniden yükle
        await fetchBlogData();
        
    } catch (error) {
        console.error('Beğeni işlemi başarısız:', error);
    } finally {
        setTimeout(() => {
            showHeart.value = false;
        }, 1000);
    }
}

// WebSocket dinleyicisi
function subscribeToLikes() {
    $echo.channel(`post.${blog.value.id}`).listen('.post.liked', (event) => {
        console.log(event)
        if (event.status == 'liked') {
            isLiked.value=true

        } else {
            isLiked.value=false
        }
        likes.value = event.likeCount
    })
}

// Component unmount olduğunda kanaldan ayrıl
onUnmounted(() => {
    if (blog.value) {
        $echo.leave(`post.${blog.value.id}`);
    }
});

onMounted(async () => {
    try {
        await fetchBlogData();
    } catch (error) {
        console.error('Blog yüklenirken hata:', error);
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
.prose {
    @apply text-lg leading-relaxed;
}

.prose p {
    @apply mb-4;
}

.prose img {
    @apply rounded-lg my-6 mx-auto;
}

/* Kalp Animasyonu */
.heart-enter-active {
    animation: scale-up 0.5s ease-out;
}

.heart-leave-active {
    animation: fade-out 0.5s ease-in;
}

@keyframes scale-up {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.5);
        opacity: 0.8;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes fade-out {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.animate-heart {
    filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));
}
</style>