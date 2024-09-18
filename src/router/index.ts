import MapContainerView from '@/views/MapContainer.view.vue'
import MapForceUpdateView from '@/views/MapForceUpdate.view.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MapContainerView
    },
    {
      path: '/updated',
      name: 'update',
      component: MapForceUpdateView
    }
  ]
})

export default router
