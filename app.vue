<template>
    <NuxtLayout> </NuxtLayout>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

#__nuxt {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
body {
    font-family: "Inter", serif;
}
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
.layout-enter-active,
.layout-leave-active {
    transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
    filter: grayscale(1);
}
</style>

<script setup></script>
