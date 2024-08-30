import '~/assets/styles/styles.css'
import 'vue-toastification/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import { ToastOptions } from '~/config/toast'

import App from '~/App.vue'
import router from '~/router'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(Toast, ToastOptions)
  .mount('#app')
