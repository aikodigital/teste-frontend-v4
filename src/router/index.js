import { createRouter, createWebHistory } from 'vue-router'
import PosicoesEStatusView from '../views/PosicoesEStatusView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'posicoesEStatus',
      component: PosicoesEStatusView
    },
    {
      path: '/produtividade',
      name: 'produtividade',
      component: () => import('../views/ProdutividadeView.vue')
    }
  ]
})

export default router
