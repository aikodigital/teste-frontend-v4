// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      title: 'Aiko - Gestão de Equipamentos Florestais',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Sistema para gestão de equipamentos florestais.' }
      ],
    },
  },
  devtools: { enabled: true },
  css: [
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'vuetify-nuxt-module',
    '@nuxt/scripts',
  ],
})