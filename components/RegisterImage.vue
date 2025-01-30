<template>
    <Form
        class="flex flex-1 flex-col gap-2 md:h-auto w-full md:w-auto justify-around items-center"
        @submit="onFormSubmit"
    >
        <Toast />
        <h1 class="text-2xl text-white">Profil şəkli əlavə edin</h1>
        <CldUploadWidget
            v-slot="{ open, cloudinary }"
            uploadPreset="learnteach"
            @success="onUploadSuccess"
            @error="onUploadError"
        >
            <NuxtImg
                v-if="!src"
                @click="open"
                src="images/default.png"
                width="350"
                height="350"
                class="border-4 border-white rounded-[100%] cursor-pointer"
                alt=""
            />
            <NuxtImg
                v-else
                :src="src"
                @click="src = null"
                alt="Image"
                class="shadow-md w-80 h-80 rounded-[100%] border-4 border-white"
                style="filter: grayscale(100%)"
            />
        </CldUploadWidget>
        <Button
            type="submit"
            class="bg-black text-white hover:bg-white hover:text-black"
        >
            Tamamla
        </Button>
    </Form>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const nuxtApp = useNuxtApp();

const token = await useTokenStorage(nuxtApp).get();
const toast = useToast();
const src = ref(null);

function onUploadSuccess(result) {
    src.value = result.info.secure_url;
    toast.add({
        severity: "success",
        summary: "Uğurlu",
        detail: "Şəkil uğurla yükləndi",
        life: 3000,
    });
}

function onUploadError(error) {
    toast.add({
        severity: "error",
        summary: "Xəta",
        detail: "Şəkil yüklənə bilmədi",
        life: 3000,
    });
    console.error("Yükləmə xətası:", error);
}

async function onFormSubmit() {
    if (!src.value) {
        toast.add({
            severity: "error",
            summary: "Xəta",
            detail: "Zəhmət olmasa şəkil seçin",
            life: 3000,
        });
        return;
    }

    try {
        const response = await $fetch(
            "http://127.0.0.1:8000/api/profile/image/update",
            {
                method: "PUT",
                body: {
                    profile_image: src.value, // Cloudinary-dən gələn URL-i göndəririk
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        toast.add({
            severity: "success",
            summary: "Uğurlu",
            detail: "Şəkil bazaya yazıldı",
            life: 3000,
        });

        console.log("Backend cavabı:", response);
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Xəta",
            detail: "Backendə göndərmək alınmadı",
            life: 3000,
        });
        console.error("Backend xətası:", error);
    }
}
</script>
