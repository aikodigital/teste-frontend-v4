import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/home/index.vue'

import Login from '@/pages/login/index.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/app', component: Home },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router