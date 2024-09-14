import { createRouter, createWebHistory } from 'vue-router'
import TheLayout from '../layout/TheLayout.vue'
import DashboardView from '../views/dashboard/DashboardView.vue'
import MapView from '../views/map/MapView.vue'

enum RouteNames {
  Dashboard = 'dashboard',
  Map = 'map'
}

const routes = [
  {
    path: '/',
    component: TheLayout,
    children: [
      {
        path: '',
        name: RouteNames.Dashboard,
        component: DashboardView
      },
      {
        path: '/map',
        name: RouteNames.Map,
        component: MapView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
