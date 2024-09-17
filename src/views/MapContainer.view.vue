<template>
  <div id="map" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import L from 'leaflet'
import { useEquipment } from '@/stores/equipment.store'
import { useMap } from '@/stores/map.store'

const equipmentStore = useEquipment()
const mapStore = useMap()

let map: L.Map
const emit = defineEmits(['openPopUp'])

function openPopUp() {
  emit('openPopUp')
}

const markAllEquipments = () => {
  equipmentStore.getPositions()
  equipmentStore.equipmentsLatestPosition.forEach((equipment) =>
    L.marker([equipment.position.lat, equipment.position.lon]).addTo(map).on('click', openPopUp)
  )

  map.fitBounds(mapStore.getExtremeBounds)
}

onMounted(() => {
  map = L.map('map').setView([-15.78, -56], 5)

  mapStore.copyright.addTo(map)
  markAllEquipments()
})
</script>

<style lang="scss" scoped>
#map {
  height: 100vh;
  width: 100%;
}
</style>
