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
        <VMapDivMarker
          v-if="displayPositionCard === index"
          :latlng="[pos.lat, pos.lon]"
        >
          Teste
        </VMapDivMarker>
        <VMapPinIcon :color="`${ getStateColor(pos.stateId) || '' }`" @click="displayPositionCard = index">
          <PhosphorIconTruck
            v-if="props.equipmentName?.includes('CA')"
            weight="thin"
            :color="`${ getStateColor(pos.stateId) || '' }`"
          />

          <PhosphorIconAxe
            v-if="props.equipmentName?.includes('HV')"
            weight="thin"
            :color="`${ getStateColor(pos.stateId) || '' }`"
          />

          <PhosphorIconTractor
            v-if="props.equipmentName?.includes('GT')"
            weight="thin"
            :color="`${ getStateColor(pos.stateId) || '' }`"
          />
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
  equipmentId?: string,
  equipmentName?: string
}>()

const position = ref<LatLngTuple | LatLng> ([-19.167338, -46.00347])
const history = ref<PositionHistoryWithStateId[]>([])
const displayPositionCard = ref<number>(-1)

watchEffect(async () => {
  if(props.equipmentId) {
    
    const data = await $fetch(
      `/api/equipment/${props.equipmentId }/position-history`,
    )

    history.value = data || []
    position.value = [history.value[0].lat, history.value[0].lon]
  }
})

const getStateColor = (stateId: string) => {
  return getStateSelected(stateId).color
}
</script>