<script setup lang="ts">
import { onMounted } from 'vue'
import L from 'leaflet'

const initializeMap = () => {
  const map = L.map('map').setView([-19.151801, -46.007759], 8)

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  L.marker([-19.151801, -46.007759]).addTo(map).bindPopup('CA-0001')
}

onMounted(() => {
  initializeMap()
})
</script>

<template>
  <div id="map" class="w-100 h-100"></div>
</template>
