<template>
  <div id="map" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import L from 'leaflet'
import { useEquipment } from '@/stores/equipment.store'

const equipmentStore = useEquipment()
let map: L.Map
const emit = defineEmits(['openPopUp'])

function openPopUp() {
  emit('openPopUp')
}

const insertCopyright = () => {
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)
}

const markAllEquipments = () => {
  equipmentStore.getPositions()
  equipmentStore.equipmentsLatestPosition.forEach((equipment) =>
    L.marker([equipment.position.lat, equipment.position.lon]).addTo(map).on('click', openPopUp)
  )

  centralizeMap()
}

const centralizeMap = () => {
  equipmentStore.findExtremeMarkers()

  const bounds = L.latLngBounds([
    [
      equipmentStore.southwestEquipment.position.lat,
      equipmentStore.southwestEquipment.position.lon
    ],
    [equipmentStore.northeastEquipment.position.lat, equipmentStore.northeastEquipment.position.lon]
  ])

  map.fitBounds(bounds)
}

onMounted(() => {
  map = L.map('map').setView([-15.78, -56], 5)

  insertCopyright()
  markAllEquipments()
})
</script>

<style lang="scss" scoped>
#map {
  height: 100vh;
  width: 100%;
}
</style>
