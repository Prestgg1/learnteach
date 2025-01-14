import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
export const loginValidation = zodResolver(
  z.object({
    email: z.string().email({ message: "Düzgün epoçt yazılmalıdır." }),
    password: z.string().min(1, { message: "Şifrə yazılmalıdır." }),
  }),
);

export const registerValidation = zodResolver(
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
