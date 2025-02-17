<template>
    <div class="md:text-start text-center text-white">
        <h1 class="text-4xl font-semibold">Örgən və Örgət</h1>
        <p class="text-3xl md:w-1/2">platformasına xoş gəlmisiniz</p>
    </div>
    <Toast />

    <div
        class="flex flex-col flex-1 md:flex-initial justify-center items-center w-11/12 md:w-1/2"
    >
        <div
            class="loginForm h-[600px] gap-4 flex flex-col md:flex-row bg-white bg-opacity-15 rounded-3xl p-5"
        >
            <!-- Form Kısmı -->
            <Form
                v-slot="$form"
                :initialValues="initialValues"
                @submit="onFormSubmit"
                :resolver="loginValidation"
                class="flex flex-1 flex-col gap-10 md:w-1/2 justify-around items-center p-4"
            >
                <h2 class="text-2xl text-white">Hesaba giriş</h2>
                <div class="flex flex-col gap-4 w-full">
                    <FloatLabel variant="in" class="w-full">
                        <InputText
                            id="email"
                            fluid
                            name="email"
                            class="focus:border-0 bg-[#D9D9D9] rounded-2xl focus:outline-none"
                            autocomplete="on"
                        />
                        <label for="email">Epoçt</label>
                    </FloatLabel>
                    <Message
                        v-if="$form.email?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        >{{ $form.email.error?.message }}</Message
                    >

                    <FloatLabel variant="in" class="">
                        <InputText
                            id="password"
                            type="password"
                            fluid
                            name="password"
                            class="focus:border-0 rounded-2xl bg-[#D9D9D9] focus:outline-none"
                            autocomplete="off"
                        />
                        <label for="password">Şifrə</label>
                    </FloatLabel>
                    <Message
                        v-if="$form.password?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        >{{ $form.password.error?.message }}</Message
                    >
                </div>

                <Button
                    :loading="isLoading"
                    class="bg-black text-white !border-none rounded-xl font-bold hover:bg-white hover:text-black w-full mt-4"
                    type="submit"
                >
                    Daxil ol
                </Button>
            </Form>

            <!-- Carousel Kısmı -->

            <AuthCarousel />
        </div>
    </div>
</template>

<style scoped>
.loginForm {
    backdrop-filter: blur(8px);
}

:deep(.p-float-label) input {
    width: 100%;
}
</style>

<script setup>
import AuthCarousel from "~/components/AuthCarousel.vue";

definePageMeta({
    layout: "authlayout",
    middleware: "$guest",
});
const { login, isLoggedIn } = useSanctum();

const toast = useToast();

// Formun başlangıç değerleri
const initialValues = reactive({
    email: "",
    password: "",
});

// loading durumunu takip etmek için bir ref tanımlıyoruz
const isLoading = ref(false);

// Form gönderildiğinde çalışacak fonksiyon
const onFormSubmit = async ({ valid, values }) => {
    if (valid) {
        isLoading.value = true;
        try {
            const credentials = {
                email: values.email,
                password: values.password,
            };
            const req = await login(credentials);
            console.log(req);

            // Uğurlu Giriş
            toast.add({
                severity: "success",
                summary: "Giriş olundu.",
                life: 3000,
            });
        } catch (error) {
            console.log(error);
            // Hata durumunda mesaj
            toast.add({
                severity: "error",
                summary: "Giriş uğursuz",
                detail: error,
                life: 3000,
            });
        } finally {
            isLoading.value = false;
        }
    }
};
</script>
