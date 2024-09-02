// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-09-01",
  devtools: { enabled: true },

  typescript: {
    typeCheck: true
  },

  app: {
    head: {
      title: 'Aiko',
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/gh/luxonauta/luxa@8a98/dist/compressed/luxa.min.css"
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/gh/luxonauta/luxa@8a98/dist/luxa.min.js"
        },
      ]
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],

  modules: [
    '@nuxtjs/leaflet'
  ],
  leaflet: {
    markerCluster: true
  }
})