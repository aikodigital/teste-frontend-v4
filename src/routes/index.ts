import { createRouter, createWebHistory } from "vue-router";
import Map from "../pages/Map/Map.vue";
import Machine from "../pages/Machines/Machine.vue";
const routes = [
  { path: "/", component: Map },
  { path: "/machines", component: Machine },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
