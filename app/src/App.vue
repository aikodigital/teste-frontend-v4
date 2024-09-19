<script setup lang="ts">
import { RouterView } from 'vue-router';
import EquipmentMap from '@/components/EquipmentMap.vue';
import { useAppStore } from '@/stores';
import { useEquipmentStore } from '@/stores/equipments';
import { ref } from 'vue';

const { initApp } = useAppStore();
initApp();

const isMapOpen = ref<boolean>(true);
const toggleMap = () => {
  isMapOpen.value = !isMapOpen.value;
};

const { equipments, getEquipmentCurrentStatus } = useEquipmentStore();
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="isMapOpen" :width="680">
      <EquipmentMap :points="equipments.map(getEquipmentCurrentStatus)" />
    </v-navigation-drawer>
    <v-app-bar :order="0 - +$vuetify.display.mobile">
      <template #prepend>
        <v-app-bar-nav-icon @click.stop="toggleMap" icon="mdi-map"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Teste Frontend v4</v-app-bar-title>
      <template v-slot:append>
        <v-btn to="/" icon="mdi-home"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
