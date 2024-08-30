<script setup lang="ts">
import { watch, onMounted } from "vue";
import L from "leaflet";
import("leaflet/dist/leaflet.css");
import type { IMarker } from "@/types/marker";

const props = defineProps<{
  markers: IMarker[];
}>();

const emit = defineEmits<{
  (e: "markerClicked", marker: IMarker): void;
}>();

let map: any = null;

function createMapLayer() {
  try {
    if (L) {
      map = L.map("mapContainer").setView([props.markers[0].lat || -23.5391566, props.markers[0].lng || -46.3876483], 12);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      setMarkers();
    }
  } catch (error) {
    console.log(error);
  }
}

function setMarkers() {
  props.markers.forEach((marker) => {
    const icon = L.icon({ iconUrl: `${marker.icon}.svg`, iconSize: [75, 75] });
    const leafletMarker = L.marker([marker.lat, marker.lng], { icon }).addTo(
      map
    ).bindPopup(`<div class="p-2">
        <p class="font-600">Equipamento: ${marker.name}</p>
        <p class="p-1 w-fit rounded font-500" style="color: ${marker.currentState.color}; background: ${marker.currentState.color}20">${marker.currentState.name}</p>
      </div>`);

    leafletMarker.on("click", () => {
      emit("markerClicked", marker);
    });
    leafletMarker.on("mouseover", function (e) {
      leafletMarker.openPopup();
    });
  });
}

watch(
  () => props.markers,
  () => {
    if (map) setMarkers();
  }
);

onMounted(() => {
  createMapLayer();
});
</script>
<template>
  <div id="mapContainer"></div>
</template>

<style scoped>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
