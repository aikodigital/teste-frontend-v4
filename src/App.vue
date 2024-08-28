<script setup lang="ts">
import EquipmentMap from './components/EquipmentMap.vue';
</script>

<template>
  <div id="app">
    <h1>Equipment Dashboard</h1>
    <EquipmentMap :equipmentPositions="[]" />
  </div>
</template>

<style scoped>
#app {
  text-align: center;
}

h1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: normal;
  font-size: 24px;
  margin: 20px 0;
}
</style>
