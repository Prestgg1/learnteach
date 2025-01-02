<template>
    <div class="flex flex-col justify-center items-center flex-1 h-full">
        <Header />
        <div
            class="flex-1 flex flex-col w-full md:bg-gradient-to-r bg-gradient-to-b md:to-85% from-[#a2643B] to-black"
        >
            <div
                class="flex-1 flex-col pt-10 gap-2 md:pt-0 md:gap-0 md:flex-row flex justify-start items-center md:justify-center"
            >
                <NuxtPage />
            </div>
            <Footer />
        </div>
    </div>
</template>
