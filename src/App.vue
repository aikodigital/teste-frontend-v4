<template>
  <!-- color = "teal-darken-4" -->
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :temporary="isMobile"
      color="cyan-darken-4"
      theme="dark"
      
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-row class="ma-0 pa-0" justify="center">
            <img id="img-logo" src="logo-aiko.png" alt="Aiko" />
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="bg-teal-lighten-2 text-white">
      <v-app-bar-nav-icon
        class="bg-teal-lighten-2"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title class="text-white mr-6"
        >Sistema de Monitoramento de Equipamentos Florestais</v-toolbar-title
      >
    </v-app-bar>

    <v-main>
      <router-view />
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    isMobile: false,
    items: [
      { title: "Equipamentos", icon: "mdi-truck-outline", to: "/" },
      { title: "Rotas", icon: "mdi-map-legend", to: "/route" },
      // { title: "Listagem", icon: "mdi-format-list-bulleted", to: "/listagem" },
    ],
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    updateDrawerState() {
      // Define se é um dispositivo móvel
      this.isMobile = window.innerWidth < 960;
      // Atualiza o estado do drawer com base no tipo de dispositivo
      this.drawer = !this.isMobile; // Drawer aberto em telas grandes e fechado em dispositivos móveis
    },
    mounted() {
      this.updateDrawerState();
      window.addEventListener("resize", this.updateDrawerState);
   },
    beforeUnmount() {
      window.removeEventListener("resize", this.updateDrawerState);
    },
  },
};
</script>

<style>
.nav {
  background: rgb(186, 240, 116);
}
.nav1 {
  background: darkcyan;
}
.nav-top {
  background: rgb(48, 48, 49);
}
.text-color-nav {
  color: white;
}
#img-logo {
  width: 120px;
  margin: 0px;
  padding: 0px;
}
.top-text-logo {
  width: 200px;
  margin-left: 0px;
  /* justify-content: left; */
}
.background-logo {
  background-color: white;
}
</style>