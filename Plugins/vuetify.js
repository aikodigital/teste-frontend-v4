import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  ssr: false,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.blue.darken3,
          appbar: colors.blue.lighten5,
          buttonColor: colors.blue.darken3,
          colorCardMap: colors.blue.lighten5,
          colorCardPrincipal: colors.grey.lighten4,
        },
      },
      dark: {
        dark: true,
        colors: {
          appbar: colors.grey.darken4,
          primary: colors.teal.darken1,
          buttonColor: colors.teal.lighten2,
          colorCardMap: colors.grey.darken2,
          colorCardPrincipal: colors.grey.darken4,
        }
      }
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
})

export default vuetify