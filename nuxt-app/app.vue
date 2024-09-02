<template>
  <v-app>
    <div class="root-class">
      <Dialog />
      <Header />
      <NuxtRouteAnnouncer />
      <Home :equipments="equipmentsFiltered" />
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { useNormalizedData } from '@/stores/normalizedData.store.ts';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import { useEventBus } from '@/utils/eventBus.ts';
import type {
  IEquipmentNormalized,
  IStates,
} from './interfaces/equipments.interface';

const store = useNormalizedData();
const { equipmentsFiltered } = storeToRefs(store);
const { on } = useEventBus();

on('equipmentsToFilter', (data: IEquipmentNormalized[]) => {
  store.patchFilteredEquipments(data);
});

on('stateChanged', (data: IStates | null) => {
  store.patchFilteredStates(data);
});

onBeforeMount(() => {
  store.init();
});
</script>

<style>
body,
html {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 16px;
  background: #f5f5f5;
}

html,
body,
#__nuxt,
#__layout,
.root-class {
  height: 100% !important;
  width: 100% !important;
}
</style>
