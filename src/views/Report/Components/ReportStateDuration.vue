<template>
  <div class="container py-4">
    <h2 class="mb-4 text-center">⏳ Tempo Total por Estado</h2>

    <div class="mb-4">
      <label for="equipmentSelect" class="form-label"
        >Selecione um equipamento:</label
      >
      <select
        id="equipmentSelect"
        v-model="selectedEquipmentId"
        class="form-select"
      >
        <option disabled value="">-- Escolha um equipamento --</option>
        <option
          v-for="equipment in store.equipment"
          :key="equipment.id"
          :value="equipment.id"
        >
          {{ equipment.name }}
        </option>
      </select>
    </div>

    <div v-if="filteredData.length > 0" class="table-container">
      <table class="table table-bordered table-hover align-middle">
        <thead class="table-dark sticky-header">
          <tr>
            <th>Estado</th>
            <th>Duração Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in filteredData" :key="row.key">
            <td>{{ row.stateName }}</td>
            <td>
              {{
                row.durationMs != null ? formatDuration(row.durationMs) : "-"
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else-if="selectedEquipmentId" class="text-muted">
      Nenhum histórico disponível para este equipamento.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useEquipmentDataStore } from "@/store/equipmentDataStore";

const store = useEquipmentDataStore();
const selectedEquipmentId = ref<string>("");

onMounted(async () => {
  await Promise.all([
    store.fetchEquipment(),
    store.fetchStates(),
    store.fetchStateHistory(),
  ]);
});

function formatDuration(ms: number) {
  const totalMinutes = Math.floor(ms / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}min`;
}

const filteredData = computed(() => {
  const equipment = store.equipment.find(
    (e) => e.id === selectedEquipmentId.value
  );
  if (!equipment) return [];

  const historyEntry = store.stateHistory.find(
    (h) => h.equipmentId === equipment.id
  );

  if (!historyEntry || historyEntry.states.length === 0) return [];

  const orderedStates = [...historyEntry.states].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const result: {
    key: string;
    stateName: string;
    durationMs: number | null;
  }[] = [];

  for (let i = 0; i < orderedStates.length; i++) {
    const current = orderedStates[i];
    const next = orderedStates[i + 1];

    const start = new Date(current.date);
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

    let end = next ? new Date(next.date) : new Date();
    let durationMs = end.getTime() - start.getTime();

    let isEstimated = false;
    if (!next && durationMs > THIRTY_DAYS_MS) {
      durationMs = THIRTY_DAYS_MS;
      isEstimated = true;
    }

    const stateInfo = store.getStateById(current.equipmentStateId);
    if (stateInfo) {
      result.push({
        key: `${equipment.id}-${i}`,
        stateName: stateInfo.name,
        durationMs: isEstimated ? null : durationMs,
      });
    }
  }

  return result;
});
</script>

<style scoped>
.table-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.sticky-header th {
  position: sticky;
  top: 0;
  background-color: #343a40 !important;
  color: #fff;
  z-index: 1;
}
</style>
