<template>
    <div class="md:text-start hidden md:block text-center text-white">
        <h1 class="text-4xl font-semibold">Örgən və Örgət</h1>
        <p class="text-3xl md:w-1/2">platformasına xoş gəlmisiniz</p>
    </div>
    <Toast />
    <div
        class="flex flex-col flex-1 md:flex-initial justify-center items-center w-11/12 md:w-auto"
    >
        <div
            class="registerForm w-full min-h-[50vh] gap-4 md:flex-1 flex flex-col md:flex-row md:w-auto bg-white bg-opacity-15 rounded-3xl p-5"
        >
            <Form
                v-slot="$form"
                :initialValues="initialValues"
                @submit="onFormSubmit"
                :resolver="registerValidation"
                class="flex flex-1 flex-col gap-2 md:h-auto w-full md:w-auto justify-around items-center"
            >
                <h2 class="text-2xl text-white">Hesaba giriş</h2>
                <div class="flex flex-col gap-4 w-full">
                    <FloatLabel variant="in" class="w-full">
                        <InputText
                            id="email"
                            name="email"
                            class="focus:border-0 bg-[#D9D9D9] w-full rounded-2xl focus:outline-none"
                            autocomplete="on"
                        />
                        <label for="email" class="">Epoçt</label>
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
                            name="password"
                            class="focus:border-0 rounded-2xl w-full bg-[#D9D9D9] focus:outline-none"
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
                    <FloatLabel variant="in" class="">
                        <InputText
                            id="repassword"
                            name="repassword"
                            type="password"
                            class="focus:border-0 rounded-2xl w-full bg-[#D9D9D9] focus:outline-none"
                            autocomplete="off"
                        />
                        <label for="repassword">Şifrə Təkrarı</label>
                    </FloatLabel>
                    <Message
                        v-if="$form.repassword?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        >{{ $form.repassword.error?.message }}</Message
                    >
                </div>

                <Button
                    class="bg-black text-white rounded-xl font-bold hover:bg-white hover:text-black"
                    type="submit"
                    >Qeydiyatdan keç</Button
                >
            </Form>

            <div class="card hidden md:block">
                <Image src="/images/slider.png" width="300" height="300" />
            </div>
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
definePageMeta({
    layout: "authlayout",
});

const toast = useToast();

const initialValues = reactive({
    email: "",
    password: "",
    repassword: "",
});

const onFormSubmit = ({ valid }) => {
    if (valid) {
        toast.add({
            severity: "success",
            summary: "Form is submitted.",
            life: 3000,
        });
    }
};
</script>
