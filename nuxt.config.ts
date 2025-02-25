// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify']
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxt/fonts',
    '@nuxtjs/leaflet',
    '@nuxt/icon',
    '@pinia/nuxt'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  leaflet: {
    markerCluster: true
  },
  alias: {
    '@dtos': resolve(__dirname, './server/dtos'),
    '@domain': resolve(__dirname, './server/domain'),
    '@factories': resolve(__dirname, './server/factories'),
    '@services': resolve(__dirname, './server/services'),
    '@utils': fileURLToPath(new URL('./utils', import.meta.url)),
    '@components': fileURLToPath(new URL('./components', import.meta.url)),
    '@composables': fileURLToPath(new URL('./composables', import.meta.url))
  }
})
