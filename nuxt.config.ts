// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  css: ["@/assets/css/tailwind.css", "@/assets/css/base.css"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: ["@primevue/nuxt-module", "@qirolab/nuxt-sanctum-authentication"],
  primevue: {
    options: {
      theme: "none",
    },
  },
  laravelSanctum: {
    // Replace with your Laravel API URL
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
  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
