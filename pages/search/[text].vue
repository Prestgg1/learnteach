<template>
    <main class="w-full md:px-24 px-5 py-8">
        <div class="mx-auto">
            <h1 class="text-2xl md:text-3xl font-bold mb-8 text-white">
                "{{ searchQuery }}" için arama sonuçları
            </h1>

            <!-- Sonuçlar Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <template v-for="(item, index) in searchResults" :key="index">
                    <div 
                        class="card flex flex-col m-4 bg-[#D9D9D9] text-black overflow-hidden rounded-[30px] shadow-md h-[300px] cursor-pointer hover:shadow-lg transition-shadow"
                        @click="router.push(`/blog/${item.slug}`)"
                    >
                        <div class="h-[70%] overflow-hidden">
                            <img
                                :src="`https://res.cloudinary.com/djfeqtwjx/image/upload/v1734288174/${item.thumbnail}`"
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
                                    <i class="pi pi-heart"></i>
                                    <span class="text-sm">{{ item.likes || 0 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <!-- Yükleniyor -->
            <div v-if="loading" class="flex justify-center my-8">
                <ProgressSpinner />
            </div>

            <!-- Sonuç Bulunamadı -->
            <div v-if="!loading && searchResults.length === 0" class="text-center text-white my-8">
               Blog tapılmadı.
            </div>
        </div>
    </main>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const searchQuery = computed(() => decodeURIComponent(route.params.text));
const searchResults = ref([]);
const loading = ref(true);

async function performSearch() {
    loading.value = true;
    try {
        const response = await $fetch(`http://127.0.0.1:8000/api/posts/search`, {
            method: 'POST',
            body: {
                query: searchQuery.value
            }
        });
        searchResults.value = response.data;
    } catch (error) {
        console.error('Arama hatası:', error);
    } finally {
        loading.value = false;
    }
}

watch(searchQuery, () => {
    performSearch();
}, { immediate: true });
</script> 