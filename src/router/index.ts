import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: HomePage }
  ],
});

export default router;
