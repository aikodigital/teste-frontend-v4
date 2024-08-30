// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/leaflet', '@nuxt/icon', 'dayjs-nuxt'],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            operando: '#2ecc71',
            parado: '#f1c40f',
            manutencao: '#e74c3c',
          },
        },
      },
    },
  },
  build: {
    transpile: ['vue-leaflet'],
  },
});