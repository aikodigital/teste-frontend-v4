export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', 'nuxt-primevue', '@nuxtjs/leaflet'],
  css: ['normalize.css/normalize.css', '@/assets/css/tailwind.css', 'primeicons/primeicons.css'],
  primevue: {
    options: { unstyled: true },
    importPT: { as: 'lara', from: '@/assets/presets/lara/' },
  },
  build: {
    transpile: ['primevue']
  },
  components: true,

})