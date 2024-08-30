<script lang="ts" setup>
import { onMounted, ref, defineEmits } from 'vue'
import { watch } from 'vue'
import { defineProps } from 'vue'
import L from 'leaflet'
import { useStore } from 'vuex'

import truckIcon from '../assets/icon/truck-solid.svg'
import tractor from '../assets/icon/tractor-solid.svg'

const store = useStore()
const map = ref<L.Map | null>(null)
const selectedEquipmentId = ref<string | null>(null)

const emit = defineEmits<{
  (e: 'marker-click', payload: any): void
  (e: 'productivity-data', payload: any): void
  (e: 'earnings-data', payload: any): void
}>()

type EquipmentIcons = {
  [key: string]: L.Icon<L.IconOptions>
}

const props = defineProps({
  equipmentId: {
    type: String,
    default: null
  }
})

const equipmentIcons: EquipmentIcons = {
  'Caminhão de carga': L.icon({
    iconUrl: truckIcon,
    iconSize: [35, 51],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  Harvester: L.icon({
    iconUrl: tractor,
    iconSize: [40, 56],
    iconAnchor: [12, 41],
    popupAnchor: [5, -34],
    shadowSize: [41, 41]
  })
}

const calculateProductivity = (equipmentId: string) => {
  const stateHistory = store.state.equipmentStateHistory.find(
    (history: any) => history.equipmentId === equipmentId
  )
  if (stateHistory && stateHistory.states.length > 0) {
    const totalHours = stateHistory.states.length * 1
    const operatingHours = stateHistory.states.filter(
      (state: any) =>
        store.state.equipmentState.find((s: any) => s.id === state.equipmentStateId)?.name ===
        'Operando'
    ).length

    return (operatingHours / totalHours) * 100
  }
  return 0
}
const drawEquipmentPath = (equipmentId: string) => {
  if (!map.value) return

  map.value.eachLayer((layer) => {
    if (layer instanceof L.Polyline) {
      map.value?.removeLayer(layer)
    }
  })

  const positions =
    store.state.equipmentPositionHistory.find((pos: any) => pos.equipmentId === equipmentId)
      ?.positions || []

  if (positions.length > 0) {
    const latLngs = positions.map((p: any) => [p.lat, p.lon])

    const path = L.polyline(latLngs, { color: 'blue', weight: 3 }).addTo(map.value)

    map.value.fitBounds(path.getBounds())
  }
}

const calculateEarnings = (equipmentId: string) => {
  const stateHistory = store.state.equipmentStateHistory.find(
    (history: any) => history.equipmentId === equipmentId
  )
  const equipment = store.state.equipment.find((eq: any) => eq.id === equipmentId)
  const equipmentModel = store.state.equipmentModel.find(
    (model: any) => model.id === equipment?.equipmentModelId
  )

  if (stateHistory && equipmentModel) {
    return stateHistory.states.reduce((totalEarnings: number, state: any) => {
      const earningPerHour =
        equipmentModel.hourlyEarnings.find(
          (e: any) => e.equipmentStateId === state.equipmentStateId
        )?.value || 0

      const hoursInState = state.hours || 1
      return totalEarnings + earningPerHour * hoursInState
    }, 0)
  }

  return 0
}

const showDetails = (equipment: any) => {
  console.log('Exibindo detalhes para o equipamento:', equipment)
  emit('marker-click', equipment)

  const productivity = calculateProductivity(equipment.id)
  emit('productivity-data', {
    equipmentId: equipment.id,
    productivity
  })
  console.log('Exibindo detalhes para o equipamento ali no details:', equipment)

  const earnings = calculateEarnings(equipment.id)
  emit('earnings-data', earnings)
}

watch(
  () => selectedEquipmentId.value,
  (newId) => {
    if (newId) {
      drawEquipmentPath(newId)
    }
  }
)

onMounted(() => {
  const initialLatLng = [-19.8157, -43.9542]
  const zoomLevel = 5
  map.value = L.map('map').setView(initialLatLng, zoomLevel)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value)

  store.dispatch('fetchData').then(() => {
    const positions = store.state.equipmentPositionHistory
    const equipment = store.state.equipment
    const equipmentModels = store.state.equipmentModel
    const states = store.state.equipmentState

    const latestPositions: Record<string, any> = {}

    positions.forEach((pos: any) => {
      const latestPosition = pos.positions[pos.positions.length - 1]
      latestPositions[pos.equipmentId] = latestPosition
    })

    Object.keys(latestPositions).forEach((equipmentId: string) => {
      const latestPosition = latestPositions[equipmentId]
      const equipmentInfo = equipment.find((e: any) => e.id === equipmentId)

      if (equipmentInfo) {
        const equipmentModel = equipmentModels.find(
          (m: any) => m.id === equipmentInfo.equipmentModelId
        )

        const equipmentState = equipmentModel?.hourlyEarnings
          .map((earning: any) => states.find((s: any) => s.id === earning.equipmentStateId))
          .find((state: any) => state)

        const icon =
          equipmentIcons[equipmentModel?.name || 'Caminhão de carga'] || equipmentIcons['Harvester']

        L.marker([latestPosition.lat, latestPosition.lon], { icon })
          .addTo(map.value!)
          .bindPopup(
            `
            Equipamento: ${equipmentInfo?.name || 'Desconhecido'}<br>
            Modelo: ${equipmentModel?.name || 'Desconhecido'}<br>
            Status: ${equipmentState?.name || 'Status não disponível'}
          `
          )
          .on('click', () =>
            showDetails({
              ...equipmentInfo,
              stateName: equipmentState?.name,
              stateColor: equipmentState?.color
            })
          )
      }
    })
  })
})
</script>

<template>
  <div id="map" style="height: 76.5vh"></div>
</template>

<style scoped>
#map {
  height: 100%;
  position: relative;
  z-index: 1000;
}
</style>
