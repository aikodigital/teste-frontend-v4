<template>
  <div class="w-full h-full relative z-10">
    <VMap :center="position" :zoom="11">
      <VMapGoogleTileLayer />
      <VMapZoomControl />
      <div v-if="history">
        <VMapMarker
          v-for="(pos, index) in history"
          :key="index"
          :latlng="[pos.lat, pos.lon]"
        />
      </div>
    </VMap>
  </div>
</template>

<script setup lang="ts">
import type { LatLng, LatLngTuple } from 'leaflet'

const props = defineProps<{
  equipmentId?: string
}>()

const position = ref<LatLngTuple | LatLng> ([-19.167338, -46.00347])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const history = ref<any> (null)

watchEffect(async () => {
  if(props.equipmentId) {
    
    const data = await $fetch(
      `/api/equipment/${props.equipmentId }/position-history`,
    )

    history.value = data
  }
})
</script>