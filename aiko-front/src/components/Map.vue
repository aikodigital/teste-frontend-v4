<script lang="ts" setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { onMounted } from 'vue'
import equipmentPositionHistory from '../assets/data/equipmentPositionHistory.json'
import equipmentStateHistory from '../assets/data/equipmentStateHistory.json'
import type { EquipmentPositionHistory, EquipmentStateHistory } from '@/types/equipment'
import { states } from '@/constants/states'

let map = undefined

const createMapLayer = () => {
  map = L.map('mapContainer').setView([-19.126536, -45.947756], 9)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)

  if (equipmentPositionHistory.length) {
    setMarkers()
  }
}

const getStateById = (id: string) => {
  return states.find((state) => state.id === id) || null;
}

const setMarkers = () => {
  equipmentPositionHistory.map((equipment: EquipmentPositionHistory) => {
    const currentPosition = equipment.positions.slice(-1)
    if (!currentPosition) return
    const equipmentState = equipmentStateHistory.find((eq: EquipmentStateHistory) => eq.equipmentId === equipment.equipmentId)
    if (!equipmentState) return
    const lastState = equipmentState.states.slice(-1)
    const state = (getStateById(lastState[0]?.equipmentStateId))

    return L.marker([currentPosition[0].lat, currentPosition[0].lon]).addTo(map).bindPopup('opa').bindTooltip(state?.name || '').openTooltip();
  })
}

onMounted(() => {
  createMapLayer()
})
</script>

<template>
  <div id="mapContainer"></div>
</template>

<style scoped>
#mapContainer {
  height: 1000px;
  width: 1000px;
}
</style>
