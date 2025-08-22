// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/fonts'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ['~/assets/styles/main.css'],
  ui: {
    colorMode: false,
    prefix: "",
  }
})