import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import router from './routers'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
