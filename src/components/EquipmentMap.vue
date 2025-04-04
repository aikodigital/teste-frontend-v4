<template>
  <div id="map" class="map-container"></div>
  <DetailsMap
    v-if="selectedEquipment"
    :equipment="selectedEquipment"
    :state="selectedState"
    :state-history="computedStateHistory"
    @close="selectedEquipmentId = null"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import type { EquipmentState } from "@/types/types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEquipmentDataStore } from "@/store/equipmentDataStore";
import DetailsMap from "@/components/DetailsMap.vue";

const markerIcon =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
const markerIcon2x =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png";
const markerShadow =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png";

delete (L.Icon.Default.prototype as { _getIconUrl?: () => void })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const map = ref<L.Map>();
const selectedEquipmentId = ref<string | null>(null);
const dataStore = useEquipmentDataStore();

const selectedEquipment = computed(() =>
  selectedEquipmentId.value
    ? dataStore.getEquipmentById(selectedEquipmentId.value)
    : null
);

const selectedState = computed<EquipmentState | null>(() => {
  if (!selectedEquipmentId.value) return null;
  const latest = dataStore.getLatestState(selectedEquipmentId.value);
  return latest
    ? dataStore.getStateById(latest.equipmentStateId) || null
    : null;
});

const computedStateHistory = computed(() => {
  if (!selectedEquipment.value) return [];

  const history = dataStore.stateHistory.find(
    (h: { equipmentId: string }) =>
      h.equipmentId === selectedEquipment.value?.id
  );
  if (!history) return [];

  return history.states
    .map((entry: { date: string; equipmentStateId: string }) => ({
      date: new Date(entry.date).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
      name:
        dataStore.getStateById(entry.equipmentStateId)?.name || "Desconhecido",
      color: dataStore.getStateById(entry.equipmentStateId)?.color || "#ccc",
    }))
    .sort(
      (a: { date: string }, b: { date: string }) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
});
onMounted(async () => {
  await dataStore.fetchPositions();
  await dataStore.fetchEquipment();
  await dataStore.fetchStates();
  await dataStore.fetchStateHistory();
  await nextTick();

  const el = document.getElementById("map");
  if (!el) return;

  map.value = L.map(el).setView([-19.15, -45.99], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map.value);

  dataStore.positions.forEach((equipment) => {
    const latestPosition = equipment.positions.at(-1);
    if (latestPosition && map.value) {
      const marker = L.marker([latestPosition.lat, latestPosition.lon]).addTo(
        map.value
      );

      const equipData = dataStore.getEquipmentById(equipment.equipmentId);
      const equipmentName = equipData?.name || "Equipamento";

      marker.bindTooltip(equipmentName, {
        direction: "top",
        offset: [0, -10],
        permanent: true,
        opacity: 0.9,
        className: "leaflet-tooltip-custom",
      });

      marker.on("click", () => {
        selectedEquipmentId.value = equipment.equipmentId as string;
      });
    }
  });
});
</script>

<style>
.map-container {
  height: 100vh;
  width: 100%;
  max-height: calc(100vh - 150px);
  position: relative;
}

.side-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: white;
  border-left: 1px solid #ccc;
  padding: 1rem;
  z-index: 1000;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

.leaflet-tooltip-custom {
  background: white;
  color: #333;
  padding: 4px 8px;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  font-size: 0.85rem;
  font-weight: 500;
}
</style>
