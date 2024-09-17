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
      <LMarker
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="[marker.lat, marker.lon]"
        @click="openDrawer(marker.id)"
        >
          <LIcon
          :tooltip-anchor="[25, -25]"
            :icon-anchor="[9, 39]"
          class="relative"
          >
          <div :class="`text-2xl ${marker.icon}`" />
            <div class="i-ph-caret-down-fill" />
          <Badge
            v-if="marker.state !== 'Operando'"
            pt:root:class="absolute top-0 right-0 w-[10px] h-[10px] rounded"
            :pt:root:style="`background-color: ${marker.stateColor};`"
          />
          </LIcon>
          <LTooltip>
            <Card>
              <template #title>
                {{ marker.name }}: {{ marker.model }}
              </template>
              <template #content>
                Lat: {{ marker.lat }}, Lon: {{ marker.lon }} | <Tag
                class="text-white"
                :style="`background-color: ${marker.stateColor};`"
                  :value="marker.state"
                  rounded
                />
              </template>
            </Card>
          </LTooltip>
        <Drawer
          v-if="selectedMarkerId == marker.id"
          v-model:visible="isDrawerVisible"
          position="right"
          :modal="false"
          :dismissable="false"
          class="bg-white"
          pt:mask:style="pointer-events: none !important;"
        >
          <template #header>
            <div>
              <h3 class="mt-0 mb-0">
                {{ marker.name }}
              </h3>
              <h4 class="mt-0 mb-4">
                {{ marker.model }}
              </h4>
              <h5 class="my-0 py-0">
                Histórico de Estados:
              </h5>
            </div>
          </template>
          <StateDrawerContent
            :state-history="marker.stateHistory.states"
          />
        </Drawer>
      </LMarker>
    </LMap>
  </div>
</template>

<script setup>
const zoom = ref(11)

const isDrawerVisible = ref(false)

const store = useMyEquipmentStore()
const { equipment, equipmentModel, equipmentPositionHistory, equipmentState, equipmentStateHistory } = storeToRefs(store)
const { getAllData } = store

const selectedMarkerId = ref(null)

function openDrawer(markerId) {
  selectedMarkerId.value = markerId
  isDrawerVisible.value = true
}

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
