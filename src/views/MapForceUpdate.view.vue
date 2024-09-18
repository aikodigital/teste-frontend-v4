<template>
  <div id="map" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import { useEquipment } from '@/stores/equipment.store'
import { useMap } from '@/stores/map.store'

const equipmentStore = useEquipment()
const mapStore = useMap()

let map: L.Map

const markAllEquipments = () => {
  if (!equipmentStore.equipments.length) return
  equipmentStore.getPositions()
  equipmentStore.equipments.forEach((equipment) => {
    const markerHtmlStyles = `
      color: ${equipment.state.color};
      font-size: 32px;
      display: block;
      position: relative;
      `
    const icon = L.divIcon({
      className: 'my-custom-pin',
      iconAnchor: [0, 24],
      popupAnchor: [0, -36],
      html: `<span class="material-symbols-outlined" style="${markerHtmlStyles}">${equipment.icon}</span>`
    })

    L.marker([equipment.position.lat, equipment.position.lon], { icon }).addTo(map)
  })

  map.fitBounds(mapStore.getExtremeBounds)
}

onMounted(() => {
  map = L.map('map').setView([-15.78, -56], 5)

  mapStore.copyright.addTo(map)
  markAllEquipments()
})

onUnmounted(() => {
  map.off()
  map.remove()
})
</script>

<style lang="scss" scoped>
#map {
  height: 100vh;
  width: 100%;
}
</style>
