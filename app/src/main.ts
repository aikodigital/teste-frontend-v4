import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import 'vue3-openlayers/styles.css';
import OpenLayersMap from 'vue3-openlayers';

import App from '@/App.vue';
import router from '@/router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(
  createVuetify({
    components,
    directives,
  }),
);
app.use(OpenLayersMap);
// TODO: Treeshake vuetify/ol imports or do them per-component for route chunks

app.mount('#app');
