<template>
    <div class="carousel-container md:w-1/2 h-full hidden md:flex  ">
        <Carousel 
            :value="slides" 
            :autoplayInterval="3000"
            :circular="true"
            :showNavigators="false"
            :showIndicators="true"
            verticalViewPortHeight="100%"
            class="h-full"
        >
            <template #item="sliderProps">
                <div class="h-full relative">
                    <img
                        :src="sliderProps.data.image"
                        :alt="sliderProps.data.title"
                        class="w-full h-full object-cover rounded-3xl"
                    />
                    <div class="absolute inset-0 flex flex-col justify-center items-center   text-white  text-center">
                        <div class="rounded-3xl py-16 p-3 mx-4 backdrop-blur-3xl">
                            <h2 class="text-2xl md:text-3xl font-bold mb-2">
                            {{ sliderProps.data.title }}
                        </h2>
                        <p class="text-sm md:text-base max-w-md">
                            {{ sliderProps.data.description }}
                        </p>
                        </div>
               
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script setup>
const slides = ref([
    {
        image: '/images/auth.png',
        title: 'Biliklərinizi Paylaşın',
        description: 'Öyrəndiklərinizi başqaları ilə paylaşaraq daha da inkişaf edin'
    },
    {
        image: '/images/auth.png',
        title: 'Yeni Şeylər Öyrənin',
        description: 'Peşəkar müəllimlərdən və təcrübəli insanlardan öyrənin'
    },
    {
        image: '/images/auth.png',
        title: 'Təcrübənizi Artırın',
        description: 'Praktiki təcrübə ilə biliklərinizi möhkəmləndirin'
    }
]);
</script>

<style>

</style> 