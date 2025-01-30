<script setup>
import { useRegisterStore } from '../store/Registration.ts'

const toast = useToast();

const initialValues = reactive({
    email: "",
    password: "",
    repassword: "",
});
const onFormSubmit = async ({ valid }) => {
    if (valid) {
        const response = await $fetch(`http://127.0.0.1:8000/api/auth/register/step1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: initialValues.email,
                password: initialValues.password,
                password_confirmation: initialValues.repassword,
            })
        });
        console.log(response);
        useRegisterStore().registerStep1(initialValues.email, initialValues.password);
        toast.add({
            severity: "success",
            summary: "Qeydiyyat uğurla tamamlandı.",
            life: 3000,
        });
    }
};
</script>
<template>

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
                            v-model="initialValues.email"
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
                            v-model="initialValues.password"
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
                            v-model="initialValues.repassword"
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

</template>
