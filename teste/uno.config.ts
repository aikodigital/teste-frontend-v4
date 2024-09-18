import { defineConfig, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  content: {
    filesystem: [
      '**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}',
      './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}',
    ],
  },
  presets: [
    presetUno(),
    presetIcons(),
  ],
})
