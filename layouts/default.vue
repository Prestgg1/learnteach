<template>
    <div
        class="flex flex-col bg-second justify-center items-center flex-1 h-full"
    >
        <Header />
        <main class="flex-1 flex flex-col w-full">
            <div
                class="flex-1 flex-col gap-2 md:pt-0 md:gap-0 md:flex-row flex md:justify-center"
            >
                <NuxtPage />
            </div>
        </main>
    </div>
</template>
