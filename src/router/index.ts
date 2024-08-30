import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/pages/Login.vue'),
      meta: {
        layout: 'auth'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/Home.vue')
    },
    {
      path: '/historico/:equipmentId',
      name: 'Histórico',
      component: () => import('@/pages/HistoryEquipment.vue')
    },
  ]
});

export default router
