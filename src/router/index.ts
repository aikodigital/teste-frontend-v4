import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/Home/HomeView.vue";
import MapleView from "@/views/Map/MapView.vue";
import ReportVIew from "@/views/Report/ReportVIew.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/Map",
    name: "map",
    component: MapleView,
  },
  {
    path: "/Report",
    name: "report",
    component: ReportVIew,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
