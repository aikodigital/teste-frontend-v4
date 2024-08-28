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
}

const props = defineProps<MapProps>()
</script>

<template>
  <div id="leaflet-map-container">
    <LMap :zoom="9" :center="[-19.0, -46.0]" :useGlobalLeaflet="false">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layerType="base" />
      <LCircleMarker
        v-for="marker in props.markers"
        :lat-lng="[marker.lat, marker.lon]"
        :color="marker.color"
        :radius="5"
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
    </LMap>
  </div>
</template>

<style scoped>
#leaflet-map-container {
  height: 300px;
  width: 100%;
}
</style>