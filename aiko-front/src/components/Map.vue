<script lang="ts" setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { onMounted, ref } from 'vue'
import equipmentPositionHistory from '../assets/data/equipmentPositionHistory.json'
import equipmentStateHistory from '../assets/data/equipmentStateHistory.json'
import type { Equipment, EquipmentModel, EquipmentPositionHistory, EquipmentState, EquipmentStateHistory } from '@/types/equipment'
import { useEquipment } from '@/hooks/useEquipment'

let map: L.Map

const {
  getMarkerColor,
  getStateById,
  getStateHistory,
  getEquipmentType,
  getEquipmentModel
} = useEquipment()

const equipmentStateList = ref<(EquipmentState | null)[]>([])

const equipmentType = ref<Equipment>()
const equipmentModel = ref<EquipmentModel>()

const createMapLayer = () => {
  map = L.map('mapContainer').setView([-19.126536, -45.947756], 9)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)

  if (equipmentPositionHistory.length) {
    setMarkers()
  }
}

const getEquipmentInformation= (equipmentStateHistory: EquipmentStateHistory) => {
  equipmentStateList.value = getStateHistory(equipmentStateHistory)
  console.log(equipmentStateList.value)
  equipmentType.value = getEquipmentType(equipmentStateHistory.equipmentId)
  equipmentModel.value = getEquipmentModel(equipmentType.value.equipmentModelId)
  // console.log(equipmentType.value)
  // console.log(equipmentModel.value)
}

const setMarkers = () => {
  equipmentPositionHistory.map((equipment: EquipmentPositionHistory) => {
    const currentPosition = equipment.positions.slice(-1)
    if (!currentPosition) return
    const equipmentState = equipmentStateHistory.find((eq: EquipmentStateHistory) => eq.equipmentId === equipment.equipmentId)
    if (!equipmentState) return
    const lastState = equipmentState.states.slice(-1)
    const state = (getStateById(lastState[0]?.equipmentStateId))

    return L.marker([currentPosition[0].lat, currentPosition[0].lon], { icon: getMarkerColor(state?.color || '') }).addTo(map).on('click', () => getEquipmentInformation(equipmentState)).bindPopup('opa').bindTooltip(state?.name || '').openTooltip();
  })
}

onMounted(() => {
  createMapLayer()
})
</script>

<template>
  <div class="flex">
    <div id="mapContainer"></div>

    <div>
      <div>
        <h3>Equipment Information</h3>
        <p>Equipment Type: {{ equipmentModel?.name }}</p>
        <p>Equipment Name: {{ equipmentType?.name }}</p>
      </div>

      <div v-if="equipmentStateList.length" class="flex flex-col p-4 w-full">
        <div class="flex items-center w-full justify-between" v-for="(item, index) in equipmentStateList">
          <p class="text-white" :key="index">{{ item?.name }} </p>
          <span :class="`h-4 w-4 bg-[${ item?.color }] rounded-full`"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#mapContainer {
  height: 1000px;
  width: 1000px;
}
</style>
