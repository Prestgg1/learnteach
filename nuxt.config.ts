// https://nuxt.com/docs/api/configuration/nuxt-config
import { definePreset } from "@primevue/themes";
import Lara from "@primevue/themes/lara";

const MyPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: "{stone.50}",
      100: "{stone.100}",
      200: "{stone.200}",
      300: "{stone.300}",
      400: "{stone.400}",
      500: "{stone.500}",
      600: "{stone.600}",
      700: "{stone.700}",
      800: "{stone.800}",
      900: "{stone.900}",
      950: "{stone.950}",
    },
  },
});

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  css: ["~/assets/index.css"],
  devtools: { enabled: true },
  modules: [
    "@primevue/nuxt-module",
    "nuxt-booster",
    "@qirolab/nuxt-sanctum-authentication",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  laravelSanctum: {
    // Replace with your Laravel API URL
    apiUrl: "https://oyrenoyret.koljan.net/public",
    authMode: "token",
    sanctumEndpoints: {
      login: "/api/auth/login",
      logout: "/api/logout",
    },
    redirect: {
      redirectToAfterLogin: "/",
      redirectToAfterLogout: "/login",
      loginPath: "/login",
    },
  },
  primevue: {
    options: {
      theme: {
        preset: MyPreset,
        options: {
          cssLayer: {
            name: "primevue",
            order: "tailwind-base, primevue, tailwind-utilities",
          },
        },
      },
    },
  },
});
