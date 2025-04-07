import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/Home/HomeView.vue";
import MapleView from "@/views/Map/MapView.vue";
import ChartView from "@/views/Charts/ChartView.vue";
import ReportView from "@/views/Report/ReportView.vue";

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
    path: "/Chart",
    name: "charts",
    component: ChartView,
  },
  {
    path: "/Report",
    name: "reports",
    component: ReportView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
