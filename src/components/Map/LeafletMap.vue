<script lang="ts" setup>
import 'leaflet/dist/leaflet.css'
import { useMap } from '@/composables/useMap'
import type { IEquipmentPosition } from '@/types';

interface Props {
  positions: IEquipmentPosition,
  state: string,
  equipmentModelId: string,
}

const props = defineProps<Props>()

const { createMap, destroyMap } = useMap()

onMounted(() => {
  createMap('mapContainer', props.positions, props.state, props.equipmentModelId)
})

onBeforeUnmount(() => {
  destroyMap()
})

</script>

<template>
  <div>
    <div
      id="mapContainer"
    />
  </div>
</template>

<style lang="scss">
  #mapContainer {
    width: 400px;
    height: 400px;
  }
</style>
