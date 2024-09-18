const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        alias: "/",
        name: "home",
        path: "/home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        name: "mapa_equipamentos",
        path: "/mapa-equipamentos",
        component: () => import("pages/MapaEquipamentos.vue"),
      },
    ],
  },
];

export default routes;
