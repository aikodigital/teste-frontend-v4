import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/Default.vue';
import Equipments from '@/pages/Equipments.vue';
import GeneralVision from '@/pages/GeneralVision.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/index.vue'),
      },
      {
        path: '/equipments',
        name: 'Equipments',
        component: Equipments,
      },
      {
        path: '/general',
        name: 'GeneralVision',
        component: GeneralVision,
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;