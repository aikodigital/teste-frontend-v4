import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    component: () => import('layouts/HeaderComponent.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/mapa',
    component: () => import('src/pages/EquipamentPosition.vue'),
  },
  {
    path: '/produtos',
    component: () => import('src/pages/EquipmentModel.vue'),
  },
  {
    path: '/equipamentos',
    component: () => import('src/pages/AllEquipaments.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
