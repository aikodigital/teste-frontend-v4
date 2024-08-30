import type { RouteRecordRaw } from 'vue-router'
import Layout from '~/layouts/Layout.vue'

interface RouteLayout {
  path: string
  component: any
  children: RouteRecordRaw[]
}

const routes: RouteLayout[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('~/views/Home.vue'),
      },
    ],
  },
]

export default routes
