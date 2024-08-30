import './assets/stylecss/main.scss'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
import router from './router'
import store from './store';
import 'leaflet/dist/leaflet.css';

const app = createApp(App)
app.use(store)
app.use(router)
app.use(createStore)

app.mount('#app')
