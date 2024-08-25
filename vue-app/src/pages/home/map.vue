<template>
    <section>
      <div id="map" class="h-[600px] w-[600px]" />
    </section>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  import L from "leaflet";
  export default defineComponent({
    mounted(){
      const map = L.map('map').setView([-19.126536, -45.947756], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
          },
  });
  </script>
  