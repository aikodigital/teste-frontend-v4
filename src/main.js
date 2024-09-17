import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from '../Plugins/vuetify';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
