import './assets/main.css'
//import store from './stores/equipment.js';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'leaflet/dist/leaflet.css';
import './services/leaflet-init.js'

const app = createApp(App)

app.use(createPinia())

import { useEquipmentStore } from './stores/equipment.js'

const store = useEquipmentStore()
store.loadInitialData()
console.log(store)
app.mount('#app')
