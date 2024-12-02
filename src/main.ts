import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from '@primevue/themes/aura';
import router from "./routes";
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel, Button, Drawer } from "primevue";

import 'leaflet/dist/leaflet.css';
import 'animate.css';


createApp(App)
.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            order: 'tailwind-base, primevue, tailwind-utilities'
        },
        zIndex: {
            modal: 1100,
            overlay: 1000,
            menu: 1000,
            tooltip: 1100
        }
    }
})
.component("Drawer", Drawer)
.component("Accordion", Accordion)
.component("AccordionPanel", AccordionPanel)
.component("AccordionHeader", AccordionHeader)
.component("AccordionContent", AccordionContent)



.component("Button", Button)
.use(router)
.mount("#app");
