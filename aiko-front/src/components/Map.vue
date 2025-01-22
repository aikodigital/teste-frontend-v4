<script lang="ts" setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { onMounted } from 'vue'

let map = undefined

const createMapLayer = () => {
  map = L.map('mapContainer').setView([-19.126536, -45.947756], 9)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)
}

onMounted(() => {
  createMapLayer()
})
</script>

<template>
  <div id="mapContainer"></div>
</template>

<style scoped>
#mapContainer {
  height: 1000px;
  width: 1000px;
}
</style>
