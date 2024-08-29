<script setup lang="ts">
interface MapMarker {
  key: string
  name: string
  model: string
  state: string
  lat: number
  lon: number
  color: string
}

interface MapProps {
  markers: MapMarker[]
  zoom: number
  markerRadius: number
  hasPath?: boolean
}

const props = defineProps<MapProps>()

const mapPath = props.markers.map(marker => ({ lat: marker.lat, lng: marker.lon }))
</script>

<template>
  <div id="leaflet-map-container">
    <LMap :zoom="props.zoom" :center="[-19.16, -45.95]" :useGlobalLeaflet="false">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layerType="base" />
      <LCircleMarker
        v-for="marker in props.markers"
        :key="marker.key"
        :latLng="[marker.lat, marker.lon]"
        :color="formatFromStringToHashColorHex(marker.model)"
        :radius="props.markerRadius"
      >
        <LTooltip>
          <div>
            <div><strong>Nome: </strong>{{ marker.name }}</div>
            <div><strong>Modelo: </strong>{{ marker.model }}</div>
            <div><strong>Estado: <span :style="`color: ${marker.color}`">{{ marker.state }}</span></strong></div>
            <div><strong>Localização: </strong>({{ marker.lat }}, {{ marker.lon }})</div>
          </div>
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
  height: 80vh;
  width: 100%;
}
</style>
