import Vue from 'vue'
import App from './App.vue'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

// Importe os arquivos CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMoment, {
  moment
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
