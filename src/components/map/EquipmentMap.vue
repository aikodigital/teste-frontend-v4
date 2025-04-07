<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useEquipmentStore } from '@/store/useEquipmentStore';
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LCircleMarker
} from '@vue-leaflet/vue-leaflet';
import L from 'leaflet';
import AntPath from "./AntPath.vue";

const mapRef = ref();
const zoom = ref(10);
const center = ref<[number, number]>([-19.1, -46.1]);
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
  'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

const store = useEquipmentStore();
const {
  filteredData,
  selectedEquipmentId,
  equipmentStates,
} = storeToRefs(store);

const emojiByModelName: Record<string, string> = {
  'Caminhão de carga': '🚚',
  'Harvester': '🌾',
  'Garra traçadora': '🏗️',
  // Adicione outros modelos conforme necessário
};

// Pega última posição
const getLastPosition = (equipmentId: string): [number, number] => {
  const positions = filteredData.value.positionHistory[equipmentId] || [];
  const last = positions.length ? positions[positions.length - 1] : null;
  return last ? [last.lat, last.lon] : [0, 0];
};

// Pega primeira posição
const getFirstPosition = (equipmentId: string) => {
  const positions = filteredData.value.positionHistory[equipmentId] || [];
  return positions.length ? positions[0] : null;
};

// Últimas posições para tooltip
const lastPositions = computed(() => {
  const result: Record<string, { lat: number; lon: number } | null> = {};
  for (const equip of filteredData.value.equipments) {
    const pos = filteredData.value.positionHistory[equip.id];
    result[equip.id] = pos?.length ? pos[pos.length - 1] : null;
  }
  return result;
});

// Trajetória do equipamento selecionado
const trajectoryCoordinates = computed(() => {
  if (!selectedEquipmentId.value) return [];
  return (filteredData.value.positionHistory[selectedEquipmentId.value] || [])
    .map((p) => [p.lat, p.lon] as [number, number]);
});

// Ícone customizado
const getMarkerIcon = (equipmentId: string, modelName: string): L.Icon<L.IconOptions> => {
  const stateHist = filteredData.value.stateHistory[equipmentId] || [];
  const lastStateId = stateHist.length ? stateHist[stateHist.length - 1].equipmentStateId : null;
  const stateColor = equipmentStates.value.find((s) => s.id === lastStateId)?.color || "#999";
  const emoji = emojiByModelName[modelName] || "❓";

  return new L.DivIcon({
    className: "",
    html: `
      <div style="
        background: white;
        border: 3px solid ${stateColor};
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
      ">${emoji}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  }) as unknown as L.Icon<L.IconOptions>;
};


onMounted(() => {
  const allPositions = Object.values(filteredData.value.positionHistory).flat();
  if (allPositions.length > 0 && mapRef.value) {
    const bounds = L.latLngBounds(allPositions.map((p) => [p.lat, p.lon]));
    mapRef.value.leafletObject.fitBounds(bounds, { padding: [50, 50] });
  }
});

const selectEquipment = (id: string) => {
  store.selectedEquipmentId = id;
  const pos = getLastPosition(id);
  if (mapRef.value && pos) {
    mapRef.value.leafletObject.setView(pos, 13);
  }
};

</script>

<template>
  <LMap ref="mapRef" :zoom="zoom" :center="center" style="height: 400px; width: 100%">
    <LTileLayer :url="url" :attribution="attribution" />

    <!-- Marcadores com ícones personalizados -->
    <LMarker v-for="equipment in filteredData.equipments" :key="equipment.id" :lat-lng="getLastPosition(equipment.id)"
      :icon="getMarkerIcon(equipment.id, store.getModelName(equipment.equipmentModelId))"
      @click="selectEquipment(equipment.id)">
      <LTooltip>
        {{ equipment.name }}<br />
        {{ lastPositions[equipment.id]?.lat?.toFixed(4) ?? '–' }},
        {{ lastPositions[equipment.id]?.lon?.toFixed(4) ?? '–' }}
      </LTooltip>
    </LMarker>

    <!-- Linha animada com AntPath -->
    <AntPath v-if="selectedEquipmentId && trajectoryCoordinates.length" :lat-lngs="trajectoryCoordinates"
      :map-object="mapRef?.leafletObject" />

    <!-- Ponto de partida -->
    <LCircleMarker v-if="selectedEquipmentId && getFirstPosition(selectedEquipmentId)"
      :lat-lng="[getFirstPosition(selectedEquipmentId)!.lat, getFirstPosition(selectedEquipmentId)!.lon]" :radius="4"
      color="green" :fill-opacity="0.4" />
  </LMap>
</template>
