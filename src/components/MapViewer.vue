<script setup lang="ts">
import { createMap, setEquipmentsMarker, setEquipmentsMarkerById } from '@/services/MapService'
import type { EquipmentData } from '@/types/EquipmentTypes'
import { onMounted, watch } from 'vue'
import { useMapStore } from '@/store/EquipmentStore'

import 'leaflet/dist/leaflet.css'
import type { Map } from 'leaflet'

const props = defineProps<{
  equipments: EquipmentData[]
}>()

const mapStore = useMapStore()

onMounted(() => configMap())

async function configMap() {
  mapStore.map = createMap('map')
  await setEquipmentsMarker(mapStore.map as Map, props.equipments)
}

async function setEquipmentById(equipmentId: string) {
  await setEquipmentsMarkerById(mapStore.map as Map, props.equipments, equipmentId)
}

async function setEquipmentBySearch(textSearch: string) {
  const equipmentsFiltered = props.equipments.filter((equipment) =>
    equipment.name.toLowerCase().includes(textSearch.toLowerCase())
  )

  if (!equipmentsFiltered) return

  await setEquipmentsMarker(mapStore.map as Map, equipmentsFiltered)
}

watch(
  () => mapStore.equipmentId,
  () => setEquipmentById(mapStore.equipmentId)
)

watch(
  () => mapStore.search,
  () => setEquipmentBySearch(mapStore.search)
)
</script>

<template>
  <div class="w-full h-full max-sm:h-[300px] max-md:h-[500px]">
    <div id="map" class="w-full h-full"></div>
  </div>
</template>
