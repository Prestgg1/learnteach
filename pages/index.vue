<template>
    <h1>Wellcome {{ user }} {{ isLoggedIn }}</h1>
</template>
<script setup>
definePageMeta({
    middleware: "$auth",
});

const { isLoggedIn } = useSanctum();
const user = useCurrentUser();
</script>
