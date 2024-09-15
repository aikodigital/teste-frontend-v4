<template>
  <div id="map" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import L from 'leaflet'
import { useEquipment } from '@/stores/equipment.store'

const equipmentStore = useEquipment()
let map: L.Map

const initialPosition = () => {
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)
}

const markAllEquipments = () => {
  equipmentStore.equipmentsLatestPosition.forEach((equipment) =>
    L.marker([equipment.position.lat, equipment.position.lon]).addTo(map)
  )

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
  equipmentStore.getPositions()

  initialPosition()
  markAllEquipments()
})
</script>

<style lang="scss" scoped>
#map {
  height: 100vh;
}
</style>
