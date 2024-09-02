// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  plugins: ['~/plugins/vuetify'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  devServer: {
    port: Number(process.env.PORT) || 3000,
  },

  typescript: {
    typeCheck: true,
  },

  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/leaflet',
    'vuetify-nuxt-module',
  ],
});
