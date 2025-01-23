<script lang="ts" setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { onMounted, ref } from 'vue'
import equipmentPositionHistory from '../assets/data/equipmentPositionHistory.json'
import equipmentStateHistory from '../assets/data/equipmentStateHistory.json'
import type { Equipment, EquipmentModel, EquipmentPositionHistory, EquipmentState, EquipmentStateHistory } from '@/types/equipment'
import { useEquipment } from '@/hooks/useEquipment'
import { format } from 'date-fns'

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

const getEquipmentInformation = (equipmentStateHistory: EquipmentStateHistory) => {
  equipmentStateList.value = getStateHistory(equipmentStateHistory)
  equipmentType.value = getEquipmentType(equipmentStateHistory.equipmentId)
  equipmentModel.value = getEquipmentModel(equipmentType.value.equipmentModelId)
}

const toDate = (date) => format(new Date(date), "dd/MM/yyyy")
const toHour = (date) => format(new Date(date), "HH:mm")

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

    <div class="w-2/4 p-4">
      <div>
        <h3>Equipment Information</h3>
        <p>Equipment Type: {{ equipmentModel?.name }}</p>
        <p>Equipment Name: {{ equipmentType?.name }}</p>

        <span :class="`h-4 w-4 bg-[#2ecc71] rounded-full`"></span>
        <span :class="`h-4 w-4 bg-[#f1c40f] rounded-full`"></span>
        <span :class="`h-4 w-4 bg-[#e74c3c] rounded-full`"></span>
      </div>

      <div v-if="equipmentStateList.length" class="flex flex-col w-full">
        <div class="flex items-center justify-between border-b border-gray-600 pb-2 mb-2 w-70">
          <div class="flex items-center w-full">
            <span class="text-gray-400 font-medium">Estado</span>
          </div>
          <div class="flex w-full justify-between">
            <span class="text-gray-400 font-medium">Data</span>
            <span class="text-gray-400 font-medium">Hora</span>
          </div>
        </div>
        <div class="flex items-center w-70 justify-between" v-for="(item, index) in equipmentStateList">
          <div class="flex items-center w-full py-1">
            <span :class="`h-4 w-4 bg-[${item?.states.color}] rounded-full`"></span>
            <span class="text-white pl-2" :key="index">{{ item?.states.name }} </span>
          </div>
          <div class="flex w-full justify-between">
            <span class="text-white pr-4" :key="index">{{ toDate(item.date) }} </span>
            <span class="text-white" :key="index">{{ toHour(item.date) }} </span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
#mapContainer {
  height: 700px;
  width: 700px;
}
</style>
