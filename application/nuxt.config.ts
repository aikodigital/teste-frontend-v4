// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  css: ['animate.css'],
  vite: { ssr: { noExternal: ['moment'] } },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-phosphor-icons',
    '@nuxt/eslint',
    'nuxt-vue-map-ui'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    },
    {
      path: '~/pages/admin/components',
      pathPrefix: true,
      prefix: 'Admin'
    }
  ]
})
