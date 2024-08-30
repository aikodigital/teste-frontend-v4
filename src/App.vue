<script setup lang="ts">
import { getAllEquipment } from './services/EquipmentService'
import MapViewer from '@/components/MapViewer.vue'
import MapFilters from '@/components/MapFilters.vue'

const allEquipments = getAllEquipment()
</script>

<template>
  <header class="border-b bg-white border-root-border">
    <nav class="container mx-auto flex justify-center py-4">
      <img src="@/assets/aiko.png" alt="Aiko Logo" class="w-24" />
    </nav>
  </header>
  <main class="w-full h-screen relative">
    <MapViewer :equipments="allEquipments" />
    <MapFilters :equipments="allEquipments" />
  </main>
</template>
