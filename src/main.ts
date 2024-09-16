import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/scss/main.scss'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
