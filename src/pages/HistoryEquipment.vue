<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import LMap from "@/components/LMap.vue";
import Table from "@/components/Table.vue";
import type { IPositionItem } from "@/types/positionList";
import type { IMarker } from "@/types/marker";
import type { IColumn } from "@/types/table";
import type { IHistoryStateItem } from "@/types/equipmentStateHistory";

import { useDataEquipments } from "@/composables/useDataEquipments";

const {
  loading,
  loadStates,
  getEquipmentsPositions,
  getHistoryStateEquipment,
} = useDataEquipments();

const route = useRoute();
const equipmentsHistory = ref<IPositionItem[]>([]);
const sort = ref<"ASC" | "DESC">("DESC");
const equipment = ref<{ name: string; modelName: string }>();
const page = ref<number>(1);
const limit = ref<number>(10);
const totalItems = ref<number>(0);
const rows = ref<any[]>([]);
const columns = ref<IColumn[]>([
  { key: "date", label: "Data", sort: true },
  { key: "stateName", label: "Estado", custom: true },
]);

const equipmentItem = computed(() => {
  return equipment.value
    ? `${equipment.value.name} - ${equipment.value.modelName}`
    : "";
});

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

function loadHistoryEquipment() {
  const data: any = getHistoryStateEquipment(
    route.params.equipmentId as string,
    page.value,
    limit.value,
    sort.value
  );

  // Formatar as linhas da tabela
  rows.value = data.items.map((item: IHistoryStateItem) => ({
    date: new Date(item.date).toLocaleString(),
    stateName: item.stateName,
    stateColor: item.stateColor,
  }));
  equipment.value = data.equipment;
  totalItems.value = data.total;
}

watch(
  () => [page.value, sort.value],
  () => loadHistoryEquipment()
);

onMounted(() => {
  loadStates().then(() => {
    loadHistoryEquipment();
  });
});
</script>

<template>
  <div class="max-w-screen-2xl mx-auto h-full w-full">
    <h1>Histórico de equipamento {{ equipmentItem }}</h1>

    <Table
      :rows="rows"
      :columns="columns"
      :current-page="page"
      :items-per-page="limit"
      :total-page="totalItems"
      @change-page="page = $event"
      @handle-sort="() => (sort = sort === 'DESC' ? 'ASC' : 'DESC')"
    >
      <template #stateName="{ row }">
        <span
          class="p-1 w-fit rounded font-500"
          :style="`color: ${row.stateColor}; background: ${row.stateColor}20`"
        >
          {{ row.stateName }}
        </span>
      </template>
    </Table>
  </div>
</template>
