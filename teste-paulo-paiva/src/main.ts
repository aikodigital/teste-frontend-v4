import createVuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./shared/router";
import { createApp } from "vue";
import "leaflet/dist/leaflet.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
const vuetify = createVuetify;
app.use(router).use(pinia).use(vuetify).mount("#app");
