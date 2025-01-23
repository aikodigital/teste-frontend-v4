<script lang="ts" setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { onMounted, ref } from 'vue'
import equipmentPositionHistory from '../assets/data/equipmentPositionHistory.json'
import equipmentStateHistory from '../assets/data/equipmentStateHistory.json'
import type { DetailedStateHistory, Equipment, EquipmentModel, EquipmentPositionHistory, EquipmentStateHistory } from '@/types/equipment'
import { useEquipment } from '@/hooks/useEquipment'
import MapLegend from './MapLegend.vue'
import EquipmentHistory from './EquipmentHistory.vue'

let map: L.Map

const {
  getMarkerColor,
  getStateById,
  getStateHistory,
  getEquipmentType,
  getEquipmentModel
} = useEquipment()

const equipmentStateList = ref<DetailedStateHistory[]>([])

const equipmentType = ref<Equipment>()
const equipmentModel = ref<EquipmentModel>()

const createMapLayer = () => {
  map = L.map('mapContainer').setView([-19.126536, -45.947756], 10.5)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)

  if (equipmentPositionHistory.length) {
    setMarkers()
  }
}

const getEquipmentInformation = (equipmentStateHistory: EquipmentStateHistory) => {
  equipmentStateList.value = getStateHistory(equipmentStateHistory)
  console.log(equipmentStateList.value)
  equipmentType.value = getEquipmentType(equipmentStateHistory.equipmentId)
  equipmentModel.value = getEquipmentModel(equipmentType?.value.equipmentModelId)
}

const popUp = (eqName: string, state: string, eqType) => (
  `<span>Nome do Equipamento: ${eqName}</span>
  <br />
  <span>Tipo do Equipamento: ${eqType}</span>
  <br />
  <span>Estado Atual: ${state}</span>`)

const setMarkers = () => {
  equipmentPositionHistory.map((equipment: EquipmentPositionHistory) => {
    const currentPosition = equipment.positions.slice(-1)
    if (!currentPosition) return
    const equipmentState = equipmentStateHistory.find((eq: EquipmentStateHistory) => eq.equipmentId === equipment.equipmentId)
    if (!equipmentState) return
    const lastState = equipmentState.states.slice(-1)
    const state = (getStateById(lastState[0]?.equipmentStateId))
    const equipmentName = getEquipmentType(equipmentState.equipmentId)
    const typeName = getEquipmentModel(equipmentName?.equipmentModelId || '')

    return L.marker([currentPosition[0].lat, currentPosition[0].lon], { icon: getMarkerColor(state?.color || '') })
      .addTo(map).on('click', () => getEquipmentInformation(equipmentState))
      .bindPopup(popUp(equipmentName?.name || '', state?.name || '', typeName?.name || ''))
      .bindTooltip(typeName?.name || '')
      .openTooltip();
  })
}

onMounted(() => {
  createMapLayer()
})
</script>

<template>
  <div class="flex flex-col lg:flex-row w-full justify-between">
    <div class="flex flex-col pr-2">
      <div id="mapContainer" class="h-125 w-125 sm:w-150 md:w-180 lg:w-125 xl:w-150 2xl:w-175" />
      <MapLegend />
    </div>
    <EquipmentHistory :equipment-model="equipmentModel" :equipment-state-list="equipmentStateList" :equipment-type="equipmentType" />
  </div>
</template>
