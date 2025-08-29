// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/fonts", "nuxt-vuefire", "@pinia/nuxt"],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/styles/main.css"],
  ui: {
    colorMode: false,
    prefix: "",
  },
  vuefire: {
    config: {
      apiKey: process.env.NUXT_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
      appId: process.env.NUXT_FIREBASE_APP_ID,
    },
    auth: {
      enabled: true,
      sessionCookie: false
    }
  },
});