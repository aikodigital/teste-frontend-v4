<template>
  <div class="h-[100vh] w-[100vw]">
    <LMap
      ref="map"
      :zoom="zoom"
      :min-zoom="3"
      :center="[-19.151801, -46.007759]"
      :max-bounds="[
        [-90, -180],
        [90, 180],
      ]"
      :max-bounds-viscosity="1.0"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
        :no-wrap="true"
      />
      <MarkerGroup
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :selected-marker-id="selectedMarkerId"
        @open-drawer="openDrawer"
      />
    </LMap>
  </div>
</template>

<script setup>
onMounted(() => {
  getAllData()
})

const { getLatestItem, getIcon, getStringDate } = useMarkerUtils()

const store = useMyEquipmentStore()
const { equipment, equipmentModel, equipmentPositionHistory, equipmentState, equipmentStateHistory } = storeToRefs(store)
const { getAllData } = store

const map = ref(null)
const zoom = ref(11)
const selectedMarkerId = ref(null)

function flyToMarker(position) {
  const mapObject = map.value.leafletObject
  const zoom = 15
  const drawerWidth = 320
  const mapWidth = mapObject.getSize().x
  const lonOffset = (drawerWidth / mapWidth) * 360 / Math.pow(2, zoom)
  mapObject.flyTo([position.lat, position.lon + lonOffset], zoom)
}

function openDrawer(markerId, position) {
  selectedMarkerId.value = markerId
  flyToMarker(position)
}

const markers = computed(() => {
  return equipment.value.map((equipment) => {
    const positionHistory = equipmentPositionHistory.value.find(position => position.equipmentId == equipment.id)
    const latestPosition = getLatestItem(positionHistory.positions)
    const model = equipmentModel.value.find(model => model.id == equipment.equipmentModelId)
    const stateHistory = equipmentStateHistory.value.find(state => state.equipmentId == equipment.id)
    const latestState = getLatestItem(stateHistory.states)
    const latestDate = getLatestItem(positionHistory.positions).date
    const state = equipmentState.value.find(state => state.id == latestState.equipmentStateId)
    const icon = getIcon(model.name)
    return {
      id: equipment.id,
      name: equipment.name,
      model: model.name,
      position: latestPosition,
      date: getStringDate(latestDate),
      positionHistory: positionHistory,
      state: state.name,
      stateColor: state.color,
      stateHistory: stateHistory,
      icon: icon,
    }
  })
})
</script>

<style>
.leaflet-div-icon {
  background: none;
  border: none;
  width: fit-content !important;
  height: fit-content !important;
  font-weight: bold;
  font-size: large;
  text-align: center;
  line-height: 21px;
}
</style>
