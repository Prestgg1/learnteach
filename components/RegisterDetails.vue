<template>
    <Form
        v-slot="$form"
        :validation="registerValidationStep2"
        :initial-values="initialValues"
        @submit="onFormSubmit"
        class="flex flex-1 flex-col gap-2 md:h-auto w-full md:w-auto justify-around items-center"
    >
        <h2 class="text-2xl text-white w-2/3 text-center">
            Məlumatlarınızı daxil edin
        </h2>
        <div class="flex flex-col gap-4 w-full">
            <FloatLabel variant="in" class="w-full">
                <InputText
                    id="first_name"
                    name="first_name"
                    v-model="initialValues.first_name"
                    class="focus:border-0 bg-[#D9D9D9] w-full rounded-2xl focus:outline-none"
                    autocomplete="on"
                />
                <label for="first_name" class="">Adınız</label>
            </FloatLabel>
            <Message
                v-if="$form.first_name?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.first_name.error?.message }}</Message
            >

            <FloatLabel variant="in" class="">
                <InputText
                    id="last_name"
                    name="last_name"
                    v-model="initialValues.last_name"
                    class="focus:border-0 rounded-2xl w-full bg-[#D9D9D9] focus:outline-none"
                />
                <label for="last_name">Soyadınız</label>
            </FloatLabel>
            <Message
                v-if="$form.last_name?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.last_name.error?.message }}</Message
            >

            <FloatLabel variant="in" class="">
                <Textarea
                    id="about"
                    name="about"
                    v-model="initialValues.about"
                    class="focus:border-0 text-black rounded-2xl w-full bg-[#D9D9D9] focus:outline-none"
                />
                <label for="about">Haqqında</label>
            </FloatLabel>
            <Message
                v-if="$form.about?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.about.error?.message }}</Message
            >
        </div>

        <Button
            class="bg-black text-white rounded-xl font-bold hover:bg-white hover:text-black"
            type="submit"
            >Növbəti</Button
        >
    </Form>
</template>
<script setup>
import { useRegisterStore } from "../store/Registration.ts";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const initialValues = reactive({
    first_name: "",
    last_name: "",
    about: "",
});

const onFormSubmit = async ({ valid }) => {
    if (valid) {
        useRegisterStore().registerStep2(
            initialValues.first_name,
            initialValues.last_name,
            initialValues.about,
        );
        try {
            const response = await $fetch(
                "http://127.0.0.1:8000/api/auth/register/create",
                {
                    method: "POST",
                    body: JSON.stringify(useRegisterStore().AllData),
                },
            );
            toast.add({
                severity: "success",
                summary: "Məlumatlarınız daxil edildi.",
                life: 3000,
            });

            useRegisterStore().steper();
        } catch (error) {
            toast.error({
                severity: "error",
                summary: "Məlumatlarınız daxil edilmedi.",
                life: 3000,
            });
        }
    }
};
</script>
