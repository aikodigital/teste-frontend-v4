// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/icon',
    '@nuxtjs/leaflet',
  ],
  compatibilityDate: '2024-04-03',
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  build: {
    transpile: ['~/data'],
  },
  devtools: { enabled: true },
})
