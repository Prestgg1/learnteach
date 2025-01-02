<template>
    <div class="md:text-start text-center text-white">
        <h1 class="text-4xl font-semibold">Örgən və Örgət</h1>
        <p class="text-3xl md:w-1/2">platformasına xoş gəlmisiniz</p>
    </div>
    <Toast />

    <div
        class="flex flex-col flex-1 md:flex-initial justify-center items-center w-11/12 md:w-auto"
    >
        <div
            class="loginForm w-full min-h-[50vh] gap-4 md:flex-1 flex flex-col md:flex-row md:w-auto bg-white bg-opacity-15 rounded-3xl p-5"
        >
            <Form
                v-slot="$form"
                :initialValues="initialValues"
                @submit="onFormSubmit"
                :resolver="loginValidation"
                class="flex flex-1 flex-col gap-2 md:h-auto w-full md:w-auto justify-around items-center"
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
                    class="bg-black text-white rounded-xl font-bold hover:bg-white hover:text-black"
                    type="submit"
                >
                    Daxil ol
                </Button>
            </Form>

            <div class="card hidden md:block">
                <Image src="/images/slider.png" width="300" height="300" />
            </div>
        </div>
    </div>
</template>

<script setup>
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
        isLoading.value = true; // Loading başlatılıyor
        try {
            const credentials = {
                email: values.email,
                password: values.password,
            };
            await login(credentials);

            // Uğurlu Giriş
            toast.add({
                severity: "success",
                summary: "Giriş olundu.",
                detail: `Xoş gəldiniz, ${data.user.name}`,
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
