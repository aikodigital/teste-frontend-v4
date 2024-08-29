<script setup>
import { useRoute } from "vue-router";
import NavbarComponent from "@/shared/components/NavbarComponent.vue";
import SidebarComponent from "@/shared/components/SidebarComponent.vue";
import AlertComponent from "@/shared/components/AlertComponent.vue";

const route = useRoute();
</script>

<template>
  <v-app id="app">
    <div>
      <SidebarComponent />
      <NavbarComponent :routeTitle="route.name" />
    </div>
    <AlertComponent />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.v-table {
  background-color: #eeee;
}
</style>
