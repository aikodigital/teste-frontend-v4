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
} from '@/types'
import { useEquipmentsStore } from '@/stores/equipments'
import { getLastKnown } from '@/utils/common'
import { useLoadingStore } from '@/stores/loading'

const storeEquipment = useEquipmentsStore()
const loadingStore = useLoadingStore()

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

    if (positions && state) {
      const lastKnownPosition: Positions | undefined = getLastKnown(positions.positions)
      const lastKnownState: States | undefined = getLastKnown(state.states)

      const equipmentState_: EquipmentState | undefined = equipmentState.find(
        (st) => st.id === lastKnownState?.equipmentStateId,
      )

      if (lastKnownPosition && lastKnownState) {
        const marker = L.marker([lastKnownPosition.lat, lastKnownPosition.lon])
        marker.addTo(map).bindPopup(
          `
    <div class="bg-white text-gray-800 text-center">
      <h3 class="font-bold text-lg">${equipment.name}</h3>
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
