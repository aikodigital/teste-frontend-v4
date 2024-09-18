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

const marker = (color: string, iconName: string, size: string = '32px') => {
  const markerHtmlStyles = `
      color: ${color};
      font-size: ${size};
      display: block;
      position: relative;
      `

  return L.divIcon({
    className: 'my-custom-pin',
    iconAnchor: [0, 24],
    popupAnchor: [0, -36],
    html: `<span class="material-symbols-outlined" style="${markerHtmlStyles}">${iconName}</span>`
  })
}

const markAllEquipments = () => {
  if (equipmentStore.selectedEquipment) {
    const mainIcon = marker(
      equipmentStore.selectedEquipment.state.color,
      equipmentStore.selectedEquipment.icon
    )

    const historyIcon = marker('#808080', equipmentStore.selectedEquipment.icon, '28px')

    L.marker(
      [
        equipmentStore.selectedEquipment.position.lat,
        equipmentStore.selectedEquipment.position.lon
      ],
      { icon: mainIcon }
    ).addTo(map)

    equipmentStore.selectedEquipment.positionHistory.forEach((position) => {
      const latlng: L.LatLng = L.latLng(position.lat, position.lon)
      if (position === equipmentStore.selectedEquipment?.position) return
      L.marker(latlng, { icon: historyIcon }).addTo(map)
    })

    map.fitBounds(mapStore.getExtremeBounds)

    return
  }

  if (!equipmentStore.equipments.length) return

  equipmentStore.getPositions()
  equipmentStore.equipments.forEach((equipment) => {
    const icon = marker(equipment.state.color, equipment.icon)

    L.marker([equipment.position.lat, equipment.position.lon], { icon })
      .addTo(map)
      .on('click', () => equipmentStore.selectEquipment(equipment.equipmentId))
  })

  map.fitBounds(mapStore.getExtremeBounds).setView(mapStore.getExtremeBounds.getCenter(), 11)
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
