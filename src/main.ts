import { createApp } from 'vue'
import '@/assets/css/main.css'
import App from './App.vue'
import Router from '@/router/index'

import GlobalComponents from '@/plugins/globalComponents'

const app = createApp(App)
GlobalComponents.install(app)
app.use(Router)
app.mount('#app')
