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
  ssr: true,
  app: {
    head: {
      title: "Örgən Örgət",
      titleTemplate: "%s | Örgen Örgət",
    },
  },
  compatibilityDate: "2024-11-01",
  css: ["~/assets/index.css", "primeicons/primeicons.css"],
  devtools: { enabled: true },
  modules: [
    "@primevue/nuxt-module",
    "nuxt-booster",
    "@qirolab/nuxt-sanctum-authentication",
    "@pinia/nuxt",
    "@nuxtjs/cloudinary",
  ],
  buildModules: ["@nuxtjs/laravel-echo"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  echo: {
    plugins: ["~/plugins/echo.client.ts"],
  },
  laravelSanctum: {
    apiUrl: "http://127.0.0.1:8000",
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
  runtimeConfig: {
    public: {
      REVERB_APP_KEY: process.env.REVERB_APP_KEY,
      REVERB_APP_SECRET: process.env.REVERB_APP_SECRET,
      REVERB_HOST: process.env.REVERB_HOST,
      REVERB_PORT: process.env.REVERB_POST,
      REVERB_SCHEME: process.env.REVERB_SCHEME,
    },
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    uploadPreset: "my-custom-preset",
    apiKey: process.env.ClOUDINARY_API_KEY,
    analytics: true,
    cloud: {},
    url: {},
  },
});
