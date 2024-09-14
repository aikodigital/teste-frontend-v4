<template>
  <div style="height:100vh; width:100vw">
    <LMap
      ref="map"
      :zoom="zoom"
      :center="[47.21322, -1.559482]"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="[marker.lat, marker.lon]"
        draggable
      >
      </LMarker>
    </LMap>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const zoom = ref(6)

const store = useMyEquipmentStore()
const { equipment, equipmentModel, equipmentPositionHistory, equipmentState, equipmentStateHistory } = storeToRefs(store)
const { getAllData } = store

await useAsyncData(getAllData)

function getLatestItem(item) {
  return item.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest
  })
}

const markers = computed(() => {
  return equipment.value.map((equipment) => {
    const positionHistory = equipmentPositionHistory.value.find(position => position.equipmentId == equipment.id)
    const latestPosition = getLatestItem(positionHistory.positions)
    const model = equipmentModel.value.find(model => model.id == equipment.equipmentModelId)
    const stateHistory = equipmentStateHistory.value.find(state => state.equipmentId == equipment.id)
    const latestState = getLatestItem(stateHistory.states)
    const state = equipmentState.value.find(state => state.id == latestState.equipmentStateId)
    return {
      id: equipment.id,
      name: equipment.name,
      model: model.name,
      lat: latestPosition.lat,
      lon: latestPosition.lon,
      state: state.name,
      stateColor: state.color,
    }
  })
})
</script>
