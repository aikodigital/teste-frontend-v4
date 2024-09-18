import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  alias: { '@data': '/app/data' },
  css: [ 'leaflet/dist/leaflet.css'],

  build: {
    transpile: ['vuetify'],
  },

  compatibilityDate: '2024-09-16',

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        //
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})