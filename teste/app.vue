<template>
  <div style="height:100vh; width:100vw">
    <LMap
      ref="map"
      :zoom="zoom"
        :center="[-19.151801, -46.007759]"
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
        >
          <LIcon
            :tooltip-anchor="[20, -25]"
            :icon-anchor="[9, 39]"
          >
            <div :class="`w-6 h-6 ${marker.icon}`" />
            <div class="i-ph-caret-down-fill" />
          </LIcon>
          <LTooltip>
            <Card>
              <template #title>
                {{ marker.name }}: {{ marker.model }}
              </template>
              <template #content>
                Lat: {{ marker.lat }}, Lon: {{ marker.lon }} | <Tag
                  :style="`background-color: ${marker.stateColor}; color: white`"
                  :value="marker.state"
                  rounded
                />
              </template>
            </Card>
          </LTooltip>
      </LMarker>
    </LMap>
  </div>
</template>

<script setup>
const zoom = ref(11)

const store = useMyEquipmentStore()
const { equipment, equipmentModel, equipmentPositionHistory, equipmentState, equipmentStateHistory } = storeToRefs(store)
const { getAllData } = store

await useAsyncData(() => getAllData().then(() => true))

function getLatestItem(item) {
  return item.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest
  })
}

function getIcon(model) {
  switch (model) {
    case 'Caminhão de carga':
      return 'i-ph-truck-trailer-fill'
    case 'Harvester':
      return 'i-ph-tractor-fill'
    case 'Garra traçadora':
      return 'i-ph-crane-fill'
  }
}

const markers = computed(() => {
  return equipment.value.map((equipment) => {
    const positionHistory = equipmentPositionHistory.value.find(position => position.equipmentId == equipment.id)
    const latestPosition = getLatestItem(positionHistory.positions)
    const model = equipmentModel.value.find(model => model.id == equipment.equipmentModelId)
    const stateHistory = equipmentStateHistory.value.find(state => state.equipmentId == equipment.id)
    const latestState = getLatestItem(stateHistory.states)
    const state = equipmentState.value.find(state => state.id == latestState.equipmentStateId)
    const icon = getIcon(model.name)
    return {
      id: equipment.id,
      name: equipment.name,
      model: model.name,
      lat: latestPosition.lat,
      lon: latestPosition.lon,
      state: state.name,
      stateColor: state.color,
      icon: icon,
    }
  })
})
</script>

<style>
.leaflet-div-icon {
  background: none;
  border: none;
  font-weight: bold;
  font-size: large;
  text-align: center;
  line-height: 21px;
}
</style>
