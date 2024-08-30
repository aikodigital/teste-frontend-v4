<template>
  <div class="w-full h-full relative z-10">
    <VMap :center="position" :zoom="11">
      <VMapGoogleTileLayer />
      <VMapZoomControl />
      <VMapMarker
        v-for="(pos, index) in history"
        :key="index"
        :latlng="[pos.lat, pos.lon]"
      >
        <VMapPinIcon :color="`${ getStateColor(pos.stateId) || '' }`">
          <PhosphorIconTractor />
        </VMapPinIcon>
      </VMapMarker>
    </VMap>
  </div>
</template>

<script setup lang="ts">
import type PositionHistoryWithStateId from '~/interfaces/admin/equipment/PositionHistoryWithState'
import type { LatLng, LatLngTuple } from 'leaflet'
import getStateSelected from '~/interfaces/admin/equipment/GetStateSelected';

const props = defineProps<{
  equipmentId?: string
}>()

const position = ref<LatLngTuple | LatLng> ([-19.167338, -46.00347])
const history = ref<PositionHistoryWithStateId[]>([])

watchEffect(async () => {
  if(props.equipmentId) {
    
    const data = await $fetch(
      `/api/equipment/${props.equipmentId }/position-history`,
    )

    history.value = data || []

    console.log(history.value)
  }
})

const getStateColor = (stateId: string) => {
  return getStateSelected(stateId).color
}
</script>