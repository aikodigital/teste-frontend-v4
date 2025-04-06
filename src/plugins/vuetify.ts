/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#F0F0F0',
          primary: '#002255',
          secondary: '#00DF00',
          error: '#ED4E45',
          info: '#FBEA48',
          success: '#54AE52',
          warning: '#F47521',
          text: '#ED4E45'
        },
      }
    },
  },
})
