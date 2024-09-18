import { createRouter, createWebHistory } from 'vue-router'
// import MapView from '../views/MapView.vue'
import MapComponent from '@/components/MapComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MapComponent
    }
  ]
})

export default router
