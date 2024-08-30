<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import LMap from "@/components/LMap.vue";
import type { IPositionItem } from "@/types/positionList";
import type { IMarker } from "@/types/marker";

import { useDataEquipments } from "@/composables/useDataEquipments";
import router from "@/router";

const {
  loading,
  equipmentPositionHistory,
  loadStates,
  getEquipmentsPositions,
} = useDataEquipments();

const equipmentsHistory = ref<IPositionItem[]>([]);

const markers = computed<IMarker[]>(() => {
  const itemsMarker = equipmentsHistory.value.map((itemPos) => {
    const { lat, lon } = itemPos.position;
    const icon: "truck" | "backhoe" | "tractor" =
      itemPos.equipment.modelName === "Garra traçadora"
        ? "backhoe"
        : itemPos.equipment.modelName === "Harvester"
        ? "tractor"
        : "truck";
    return {
      equipmentId: itemPos.equipment.id,
      lat: lat,
      lng: lon,
      name: itemPos.equipment.name,
      icon: icon,
      currentState: {
        ...itemPos.equipment.currentState,
      },
    };
  });
  return itemsMarker;
});

function loadEquipmentsPositions() {
  const positions = getEquipmentsPositions();
  equipmentsHistory.value = positions;
}

function handleMarkerClicked(marker: IMarker) {
  router.push(`historico/${marker.equipmentId}`);
}

onMounted(async () => {
  await loadStates();
  loadEquipmentsPositions();
});
</script>

<template>
  <div class="max-w-screen-2xl mx-auto h-full w-full">
    <div class="w-full h-[700px] mt-10 mx-auto">
      <LMap v-if="markers.length > 0" :markers="markers" @markerClicked="handleMarkerClicked" />
    </div>
  </div>
</template>
