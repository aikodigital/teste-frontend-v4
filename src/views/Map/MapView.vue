<template>
  <div class="map-view">
    <EquipmentMap />
  </div>
</template>

<script setup lang="ts">
import EquipmentMap from "@/views/Map/Components/EquipmentMap.vue";
</script>

<style scoped>
.map-view {
  text-align: center;
  margin-top: 20px;
}

h1 {
  color: #333;
}

p {
  color: #666;
}
</style>
