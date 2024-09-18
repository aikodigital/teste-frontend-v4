<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-indigo-10">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Olá, Usuário Aiko </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="300"
      :breakpoint="500"
      bordered
    >
      <q-list>
        <q-item-label header> Menu aiko </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const miniState = ref(true);

const linksList = [
  {
    title: "Home",
    caption: "Home",
    icon: "home",
    link: "/home",
  },
  {
    title: "Mapa de Equipamentos",
    caption: "Mapa de Equipamentos",
    icon: "fa-solid fa-map-location-dot",
    link: "/mapa-equipamentos",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style>
.text-aiko {
  color: #003184;
}
.bg-aiko {
  background-color: #003184;
}

.q-item.q-router-link--active,
.q-item--active {
  color: #003184 !important;
}
</style>
