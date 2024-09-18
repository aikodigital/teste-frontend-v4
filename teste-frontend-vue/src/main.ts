import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router'
import Aura from '@primevue/themes/aura';
import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select'

const app = createApp(App)

app.use(router)
.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
.use(ToastService)
.component("DataTable", DataTable)
.component("Dialog", Dialog)
.component("InputText", InputText)
.component("Select", Select)
.component("Button", Button);

app.mount('#app')
