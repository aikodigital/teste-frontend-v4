/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import Aura from '@primevue/themes/aura'
import 'leaflet/dist/leaflet.css'

import 'primeicons/primeicons.css'

import { Image, Button } from 'primevue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(router)

app.component('Button', Button)
app.component('Image', Image)

app.mount('#app')
