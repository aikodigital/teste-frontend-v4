<template>
  <div class="main-content-highlight">
    <div v-for="equipment in equipmentsFiltered" :key="equipment.id">
      <EquipmentsInfo :equipment="equipment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const store = useNormalizedData();
const { equipmentsFiltered } = storeToRefs(store);
</script>

<style>
.main-content-highlight {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 768px) {
  .main-content-highlight {
    grid-template-columns: 1fr;
  }
}
</style>
