import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'
import MapLeaflat from '@/components/Map.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/map',
      name: 'MapLeaflat',
      component: MapLeaflat
    }
  ]
})
