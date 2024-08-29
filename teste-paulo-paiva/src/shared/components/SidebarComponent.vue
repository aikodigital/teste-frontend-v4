<script setup lang="ts">
import router from "@/shared/router";
import { useSidebarStore } from "@/shared/store/sidebar_store";
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { ObjectRoute } from "@/shared/dtos/object_route";

const display = ref(useDisplay());

const sidebarStore = useSidebarStore();

const items = ref<ObjectRoute[]>([
  {
    title: "Equipamentos",
    icon: "mdi-view-dashboard-outline",
    url: "/equipamentos",
  },
  {
    title: "Localização",
    icon: "mdi-autorenew",
    url: "/localização",
  },
]);

const redirect = (url: string) => {
  sidebarStore.selectedMenuItem = url;
  const atual = router.currentRoute.value;
  if (atual.path != url) {
    router.push({ path: url });
  }
  if (display.value.mdAndDown) {
    sidebarStore.toggleRail();
  }
};
</script>

<template>
  <v-navigation-drawer
    style="padding: 0px !important"
    elevation="3"
    app
    width="260"
    :rail="sidebarStore.getRail"
    :rail-width="display.mdAndDown ? -90 : 96"
    :permanent="display.mdAndDown ? false : true"
    :style="
      display.mdAndDown
        ? sidebarStore.getRail
          ? 'transform: translateX(-110%)'
          : 'transform: translateX(0%)'
        : 'transform: translateX(0%)'
    "
  >
    <v-col cols="12">
      <div v-if="!sidebarStore.getRail" class="d-flex align-center">
        <v-img
          src="@/assets/aiko.png"
          max-height="80"
          aspect-ratio="1"
          class="mr-3"
        ></v-img>
        <v-icon
          @click="sidebarStore.toggleRail"
          size="30"
          color="green"
          class="position-absolute pb-10"
        >
          mdi-menu
        </v-icon>
      </div>
      <div v-else class="mb-10">
        <v-icon
          @click="sidebarStore.toggleRail"
          size="35"
          color="logo"
          class="position-absolute ml-3"
          style="
            top: 15px;
            left: 15px;
            border: 2px solid green;
            border-radius: 50%;
          "
        >
          mdi-chevron-right
        </v-icon>
      </div>
    </v-col>

    <v-list class="mx-auto">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        @click="redirect(item.url)"
        :value="item.url"
        class="my-1 mx-2 px-0"
        color="white"
        active-class="is-active"
        rounded="lg"
        :class="{
          'elevation-2': item.url === sidebarStore.selectedMenuItem,
          'elevation-0': item.url !== sidebarStore.selectedMenuItem,
        }"
        :active="item.url === sidebarStore.selectedMenuItem"
      >
        <v-tooltip activator="parent" location="top">
          {{ item.title }}
        </v-tooltip>

        <v-list-item-title
          class="text-subtitle-1 text-start mx-3"
          :class="{ 'font-bold': item.url === sidebarStore.selectedMenuItem }"
        >
          <v-icon
            :color="
              item.url === sidebarStore.selectedMenuItem ? 'white' : 'green'
            "
            :class="{ 'ml-3': sidebarStore.getRail }"
            >{{ item.icon }}</v-icon
          >
          <span v-if="!sidebarStore.getRail" class="ml-2">
            {{ item.title }}</span
          >
        </v-list-item-title>
      </v-list-item>

      <v-list-item class="my-1 mx-2 px-0" color="white" rounded="lg">
        <v-tooltip activator="parent" location="top"> Sair </v-tooltip>

        <v-list-item-title class="text-subtitle-1 text-start mx-3">
          <v-icon color="green" :class="{ 'ml-3': sidebarStore.getRail }"
            >mdi-logout</v-icon
          >
          <span v-if="!sidebarStore.getRail" class="ml-2">Sair</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.is-active {
  background-color: green;
}
.font-bold {
  font-weight: bold;
}
</style>
