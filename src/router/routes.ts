import { RouteRecordRaw } from 'vue-router';
import { Home, Map } from '../pages';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/map',
    name: 'map',
    component: Map,
  }
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('pages/ErrorNotFound.vue'),
  // },
];

export default routes;
