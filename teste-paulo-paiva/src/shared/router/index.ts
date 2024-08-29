import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/equipamentos",
    name: "Equipamentos",
    component: () => import("@/modules/equipments/ui/view/EquipmentsView.vue"),
  },
  {
    path: "/localização",
    name: "Localização de equipamentos",
    component: () => import("@/modules/location/ui/view/LocationView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
