<script setup lang="ts">
interface MapMarker {
  key: string
  name: string
  model: string
  state: string
  lat: number
  lon: number
  date: string
  color: string
}

interface MapProps {
  markers: MapMarker[]
  zoom: number
  hasPath?: boolean
}

const props = defineProps<MapProps>()

const mapPath = computed(() => props.markers.map(({ lat, lon }) => ({ lat, lng: lon })))
</script>

<template>
  <div id="leaflet-map-container">
    <LMap :zoom="props.zoom" :center="[-19.16, -45.95]" :useGlobalLeaflet="false">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layerType="base" />
      <LCircleMarker
        v-for="marker in props.markers"
        :key="marker.key"
        :latLng="[marker.lat, marker.lon]"
        :color="generateHashColorHex(marker.model)"
        :radius="8"
      >
        <LTooltip>
          <slot name="tooltip" :marker="marker" />
        </LTooltip>
      </LCircleMarker>
      <LPolyline
        v-if="props.hasPath"
        :latLngs="mapPath"
        :color="'gray'"
        :opacity="0.3"
      />
    </LMap>
  </div>
</template>

<style scoped>
#leaflet-map-container {
  height: 60vh;
  width: 100%;
}
</style>
