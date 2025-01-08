import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/leaflet',
    '@nuxt/test-utils/module',
    '@primevue/nuxt-module'
  ],
  primevue: {
    options: {
      theme: {
          preset: Aura
      }
  }
}
})