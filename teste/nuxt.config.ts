import { exec } from 'child_process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@primevue/nuxt-module',
    '@nuxt/eslint',
    '@nuxtjs/leaflet',
    '@pinia/nuxt',
  ],
  css: [
    '@/assets/styles.css',
  ],
  // hooks: {
  //   'build:before': () => {
  //     exec('pnpm lint-watch', (err, stdout, stderr) => {
  //       if (err) {
  //         console.error(`lint-watch error: ${stderr}`)
  //         throw err
  //       }
  //       console.log(stdout)
  //     })
  //   },
  // },
  primevue: {
    options: {
      unstyled: true,
      ptOptions: {
        mergeSections: true,
        mergeProps: true,
      },
    },
    importPT: { as: 'Aura', from: '@/presets/aura' },
  },
  postcss: {
    plugins: {
      '@unocss/postcss': {},
    },
  },
  eslint: {
    checker: {
      configType: 'flat',
    },
    config: {
      stylistic: true,
    },
  },
})
