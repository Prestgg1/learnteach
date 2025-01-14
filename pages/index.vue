<template>
    <main class="md:mt-10 w-full px-5 md:px-24 flex flex-col gap-5">
        <h1 class="font-medium text-2xl md:text-4xl">Hamısı</h1>
        <div class="w-full flex justify-center gap-5">
            <Button class="bg-white md:w-1/6 rounded-xl border-0"
                >Bloglar</Button
            >
            <Button class="bg-black md:w-1/6 rounded-xl text-white border-0">
                Anonim Paylaşımlar
            </Button>
        </div>
        <!-- VirtualScroller -->
        <VirtualScroller
            :items="blogs"
            :itemSize="350"
            showLoader
            :loading="loading"
            lazy
            @lazy-load="onLazyLoad"
            style="height: 80vh; scrollbar-width: none"
        >
            <template v-slot:content>
                <!-- Blog Kartları -->
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full"
                >
                <template v-for="(item, index) in blogs" :key="index">
    <div class="card flex flex-col bg-[#D9D9D9] text-black overflow-hidden  rounded-[30px] shadow-md h-[300px] md:max-h-[350px] m-4">
        <div class="h-[70%] overflow-hidden">
            <img
                :src="'https://res.cloudinary.com/djfeqtwjx/image/upload/v1734288174/' + item.thumbnail"
                alt="Blog Image"
                class="w-full h-full object-cover"
            />
        </div>
        <div class="p-4 flex flex-col justify-between h-[30%]">
            <div>
                <h3 class="font-medium text-lg line-clamp-2">
                    {{ item.title }}
                </h3>
                <p class="text-gray-500 text-sm mt-2 line-clamp-2">
                    {{ item.description }}
                </p>
            </div>
            <div class="flex justify-between items-center mt-3">
                <div class="flex items-center gap-2">
                    <Icon name="mdi:eye" size="20"/>
                    <span class="text-sm">{{ item.views || 0 }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <Icon name="mdi:heart" size="20"/>
                    <span class="text-sm">{{ item.likes || 0 }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
                </div>
            </template>
        </VirtualScroller>
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

async function onLazyLoad() {
    if (!hasMorePages.value || loading.value) return;

    loading.value = true;
    try {
        const response = await $fetch(
            `https://oyrenoyret.koljan.net/public/api/posts?page=${nextPage.value}`,
        );
        blogs.value = [...blogs.value, ...response.data];
        nextPage.value = response.nextPage;
        hasMorePages.value = response.hasMorePages;
    } catch (error) {
        console.error("Bloglar Yüklənəmədi:", error);
    } finally {
        loading.value = false;
    }
}
</script>
