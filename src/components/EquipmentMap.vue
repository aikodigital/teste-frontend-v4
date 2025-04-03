<template>
  <div id="map" class="map-container"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEquipmentDataStore } from "../store/equipmentDataStore";

const map = ref<L.Map>();
const dataStore = useEquipmentDataStore();

onMounted(async () => {
  await dataStore.fetchPositions();
  await dataStore.fetchEquipment();
  await dataStore.fetchStates();
  await dataStore.fetchStateHistory();
  map.value = L.map("map").setView([-19.15, -45.99], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map.value as L.Map);

  dataStore.positions.forEach((equipment) => {
    const latestPosition = equipment.positions.at(-1);

    if (latestPosition && map.value) {
      const marker = L.marker([latestPosition.lat, latestPosition.lon]).addTo(
        map.value
      );

      marker.on("click", () => {
        const equipData = dataStore.getEquipmentById(equipment.equipmentId);
        const latestState = dataStore.getLatestState(equipment.equipmentId);
        const stateData = latestState
          ? dataStore.getStateById(latestState.equipmentStateId)
          : null;

        marker
          .bindPopup(
            `<b>${
              equipData?.name || "Equipamento Desconhecido"
            }</b><br>Estado: ${stateData?.name || "Desconhecido"}`
          )
          .openPopup();
      });
    }
  });
});
</script>
