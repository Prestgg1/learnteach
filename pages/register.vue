<template>
    <div class="md:text-start hidden md:block text-center text-white">
        <h1 class="text-4xl font-semibold">Örgən və Örgət</h1>
        <p class="text-3xl md:w-1/2">platformasına xoş gəlmisiniz</p>
    </div>
    <Toast />
    <div
        class="flex flex-col flex-1 md:flex-initial justify-center items-center w-11/12 md:w-1/2"
    >
        <div
            class="registerForm w-full min-h-[50vh] gap-4 md:flex-1 flex flex-col md:flex-row md:w-auto bg-white bg-opacity-15 rounded-3xl p-5"
        >
            <component
                :is="
                    useRegisterStore().CheckSteper == 2
                        ? RegisterDetails
                        : useRegisterStore().CheckSteper == 3
                          ? RegisterImage
                          : RegisterForm
                "
            />

            <AuthCarousel />
        </div>
    </div>
</template>

<style>
@media (width < 800px) {
    body:has(.registerForm) .register {
        display: none;
    }
}
</style>
<script setup>
import { useRegisterStore } from "../store/Registration.ts";
import { RegisterDetails } from "#components";
import { RegisterForm } from "#components";
import { RegisterImage } from "#components";
definePageMeta({
    layout: "authlayout",
});
</script>
