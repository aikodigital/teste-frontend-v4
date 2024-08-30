import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/home/index.vue'

import Login from '@/pages/login/index.vue'
import Equipment from '@/pages/equipment/index.vue'

const routes = [
    { path: '/', component: Login, name: 'login' },
    { path: '/app', component: Home, name: 'home' },
    { path: '/equipment/:id', component: Equipment, name: 'equipment' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router