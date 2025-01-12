<template>
  <div class="h-full w-full p-2">
    <div id="map" class="h-full w-full"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import L from 'leaflet'
import { formatDate } from '@/utils/format'
import { equipmentState } from '@/data/equipmentState'
import type {
  EquipmentPositionHistory,
  Positions,
  States,
  EquipmentState,
  Equipment,
  EquipmentStateHistory,
  EquipmentModel,
} from '@/types'
import { useEquipmentsStore } from '@/stores/equipments'
import { getLastKnown } from '@/utils/common'
import { useLoadingStore } from '@/stores/loading'
import Caminhão from '@/assets/icons/business.png'
import Traçadora from '@/assets/icons/truck.png'
import Harvester from '@/assets/icons/harvester.png'

const storeEquipment = useEquipmentsStore()
const loadingStore = useLoadingStore()

const iconsByModelId: Record<string, L.Icon> = {
  'Caminhão de carga': L.icon({
    iconUrl: Caminhão,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  'Garra traçadora': L.icon({
    iconUrl: Traçadora,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
  Harvester: L.icon({
    iconUrl: Harvester,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [30, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  }),
}

const loadMap = async () => {
  const map = L.map('map').setView([-19.9208, -43.9378], 8)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
  }).addTo(map)

  storeEquipment.equipments.forEach((equipment: Equipment) => {
    const positions: EquipmentPositionHistory | undefined = storeEquipment.positions.find(
      (pos) => pos.equipmentId === equipment.id,
    )

    const state: EquipmentStateHistory | undefined = storeEquipment.states.find(
      (st) => st.equipmentId === equipment.id,
    )

    const equipmentModel: EquipmentModel | undefined = storeEquipment.models.find(
      (model) => model.id === equipment.equipmentModelId,
    )

    if (positions && state) {
      const lastKnownPosition: Positions | undefined = getLastKnown(positions.positions)
      const lastKnownState: States | undefined = getLastKnown(state.states)

      const equipmentState_: EquipmentState | undefined = equipmentState.find(
        (st) => st.id === lastKnownState?.equipmentStateId,
      )

      if (lastKnownPosition && lastKnownState) {
        const marker = L.marker([lastKnownPosition.lat, lastKnownPosition.lon], {
          icon: iconsByModelId[equipmentModel!.name],
        })
        marker.addTo(map).bindPopup(
          `
    <div class="bg-white text-gray-800 text-center">
      <h3 class="font-bold text-lg">${equipment.name}<span class="text-xs text-gray-500">(${equipmentModel!.name})</span></h3>
      <p class="text-sm"><strong>Última posición:</strong> ${formatDate(lastKnownPosition.date)}</p>
      <p class="text-sm"><strong>Estado:</strong> ${equipmentState_?.name}</p>
    </div>
    `,
        )
      }
    }
  })
}

onMounted(async () => {
  loadingStore.loading = true
  await storeEquipment.fetchEquipments()
  await storeEquipment.fetchPositions()
  await storeEquipment.fetchStates()
  await storeEquipment.fetchModels()
  await loadMap()
  loadingStore.loading = false
})
</script>

<style scoped></style>
