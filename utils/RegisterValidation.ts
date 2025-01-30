import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

export const registerValidationStep1 = zodResolver(
    z.object({
        email: z.string().email({ message: "Düzgün epoçt yazılmalıdır." }),
        password: z.string().min(1, { message: "Şifrə yazılmalıdır." }),
        repassword: z
            .string()
            .min(1, { message: "Şifrə eyni olmalıdır." })
            .refine((data: any) => data.password === data.repassword, {
                message: "Şifrələr eyni olmalıdır.",
                path: ["repassword"],
            }),
    }),
);

export const registerValidationStep2 = zodResolver(
    z.object({
        fist_name: z.string().min(1, { message: "Ad yazılmalıdır." }),
        last_name: z.string().min(1, { message: "Soyad yazılmalıdır." }),
        about: z.string().min(1, { message: "Haqqında yazılmalıdır." }),
    }),
);

export const registerValidationStep3 = zodResolver(
    z.object({
        profile_image: z.string().min(1, { message: "Profil şəkili yazılmalıdır." }),
    }),
);