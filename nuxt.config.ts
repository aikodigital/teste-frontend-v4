export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.css'],
  plugins: ['~/plugins/fontawesome.ts'],
  ssr: false,
  modules: ['@nuxtjs/leaflet']
})