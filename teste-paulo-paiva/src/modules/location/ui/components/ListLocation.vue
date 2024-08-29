<template>
  <v-row>
    <v-col id="map" style="height: 500px"></v-col>
  </v-row>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import L from "leaflet";

import equipmentPositionHistory from "@/data/equipmentPositionHistory.json";
import equipmentState from "@/data/equipmentState.json";
import equipmentStateHistory from "@/data/equipmentStateHistory.json";

const equipmentPositionHistoryData = ref(equipmentPositionHistory);
const equipmentStateData = ref(equipmentState);
const equipmentStateHistoryData = ref(equipmentStateHistory);

const props = defineProps<{
  selectedState: string;
  filterId: string;
}>();

let map: L.Map | null = null;

const addMarkers = () => {
  if (map) {
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map?.removeLayer(layer);
      }
    });
  }

  equipmentPositionHistoryData.value.forEach((item: any) => {
    const equipmentId = item.equipmentId;

    if (props.filterId && !equipmentId.includes(props.filterId)) {
      return;
    }

    const positions = item.positions;

    positions.forEach((position: any) => {
      const latestState = equipmentStateHistoryData.value.find(
        (state: any) => state.equipmentId === equipmentId
      );
      const state = latestState?.states[latestState.states.length - 1];
      const equipmentState = equipmentStateData.value.find(
        (eState: any) => eState.id === state?.equipmentStateId
      );

      if (props.selectedState && equipmentState?.name !== props.selectedState) {
        return;
      }

      L.marker([position.lat, position.lon]).addTo(map!).bindPopup(`
          <strong>Equipment ID:</strong> ${equipmentId}<br>
          <strong>Lat:</strong> ${position.lat}<br>
          <strong>Lon:</strong> ${position.lon}<br>
          <strong>State:</strong> ${equipmentState?.name || "Unknown"}<br>
          <strong>Color:</strong> <span style="color: ${
            equipmentState?.color || "#000"
          }">${equipmentState?.color || "N/A"}</span>
        `);
    });
  });
};

onMounted(() => {
  map = L.map("map").setView([0, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  addMarkers();
});

watch([() => props.selectedState, () => props.filterId], addMarkers);
</script>
