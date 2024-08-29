import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi.mjs";

import { createVuetify } from "vuetify";

const lightTheme = {
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#FF8B3D",
    logo: "#438EFF",
    navy: "#0f2733",
    "primary-darken-1": "#3700B3",
    secondary: "#9575CD",
    "secondary-accent": "#6200EA",
    "secondary-darken-1": "#018786",
    error: "#CC3333",
    info: "#2196F3",
    success: "#22CC44",
    warning: "#FB8C00",
    "orange-dark": "#E52A0B",
    base: "#F2F4F5",
  },
};

const darkTheme = {
  colors: {
    background: "#121212",
    surface: "#1e1e1e",
    primary: "#FF8B3D",
    logo: "#438EFF",
    navy: "#0f2733",
    "primary-darken-1": "#3700B3",
    secondary: "#9575CD",
    "secondary-accent": "#6200EA",
    "secondary-darken-1": "#018786",
    error: "#CC3333",
    info: "#2196F3",
    success: "#22CC44",
    warning: "#FB8C00",
    "orange-dark": "#E52A0B",
    base: "#1e1e1e",
    black: "#ffffff",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
  components,
  directives,
});
