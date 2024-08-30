<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue'
import { useEquipmentStore } from '@/stores/useEquipmentStore'
import L from 'leaflet'
import EquipmentHistoryModal from '@/components/EquipmentHistoryModal.vue'

const visible = ref<boolean>(false)
const equipmentId = ref<string>('')

const props = defineProps({
  markers: {
    type: Array as () => Array<{
      id: string
      name: string
      state: string
      position: L.LatLngExpression
    }>,
    default: () => []
  }
})

// Função para popular os markers
const populateMarkers = async () => {
  const store = useEquipmentStore()

  await store.fetchEquipmentData()
  await store.fetchEquipmentStates()
  await store.fetchEquipmentStateHistory()
  await store.fetchEquipmentPositionHistory()

  // Populando markers com as últimas posições e informações dos equipamentos
  return store.equipmentData
    .map((equipment) => {
      const latestPosition = store.getLatestPositionById(equipment.id)
      const latestState = store.getLatestEquipmentStateById(equipment.id)

      if (latestPosition) {
        return {
          id: equipment.id,
          name: equipment.name,
          state: latestState ? latestState.name : 'Desconhecido',
          stateDate: latestState ? latestState.date : 'N/A',
          color: latestState ? latestState.color : '#000000',
          position: [latestPosition.lat, latestPosition.lon] as L.LatLngExpression
        }
      }
      return null
    })
    .filter((marker) => marker !== null) as Array<{
    id: string
    name: string
    state: string
    stateDate: string
    color: string
    position: L.LatLngExpression
  }>
}

const initializeMap = async () => {
  const markersData = await populateMarkers()

  const map = L.map('map').setView([0, 0], 8)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  if (markersData.length > 0) {
    const bounds = L.latLngBounds(markersData.map((marker) => marker.position))

    markersData.forEach((markerData) => {
      const marker = L.marker(markerData.position).addTo(map)
      const formattedDate = new Date(markerData.stateDate).toLocaleString()
      const popupContent = `
        <div style="color: ${markerData.color}">
          <h4>${markerData.name}: ${markerData.state || 'Desconhecido'}</h4>
          <span>${formattedDate}</span>
        </div>
      `

      marker.bindPopup(popupContent, {
        closeButton: false
      })

      marker.on('click', () => {
        equipmentId.value = markerData.id
        visible.value = true
      })

      marker.on('mouseover', () => {
        marker.openPopup()
      })

      marker.on('mouseout', () => {
        marker.closePopup()
      })
    })

    map.fitBounds(bounds)
  }
}

onMounted(() => {
  initializeMap()
})
</script>

<template>
  <div id="map" class="w-100 h-100"></div>
  <EquipmentHistoryModal :equipmentId="equipmentId" v-model="visible" />
</template>
