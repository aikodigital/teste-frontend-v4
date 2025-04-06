<template>
  <div class="container py-4">
    <h2 class="mb-4 text-center">💰 Relatório de Ganhos e Perdas</h2>

    <div class="mb-4">
      <label for="equipmentSelect" class="form-label"
        >Selecione um equipamento:</label
      >
      <select
        id="equipmentSelect"
        v-model="selectedEquipmentId"
        class="form-select"
      >
        <option disabled value="">-- Selecione --</option>
        <option
          v-for="equipment in store.equipment"
          :key="equipment.id"
          :value="equipment.id"
        >
          {{ equipment.name }}
        </option>
      </select>
    </div>

    <div v-if="earningsData.length" class="table-responsive earnings-scroll">
      <table class="table table-bordered table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>Equipamento</th>
            <th>Estado</th>
            <th>Duração</th>
            <th>Valor/h</th>
            <th>Total (R$)</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="entry in earningsData" :key="entry?.key">
            <tr v-if="entry">
              <td>{{ entry.equipmentName }}</td>
              <td>{{ entry.stateName }}</td>
              <td>
                {{ entry.durationMs ? formatDuration(entry.durationMs) : "-" }}
              </td>
              <td>
                {{ entry.hourlyRate != null ? "R$ " + entry.hourlyRate : "-" }}
              </td>
              <td
                :class="{
                  'text-danger': entry.total != null && entry.total < 0,
                  'text-success': entry.total != null && entry.total >= 0,
                }"
              >
                {{ entry.total != null ? "R$ " + entry.total : "-" }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center text-muted mt-4">
      Selecione um equipamento para ver o relatório.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useEquipmentDataStore } from "@/store/equipmentDataStore";

const store = useEquipmentDataStore();
const selectedEquipmentId = ref("");

onMounted(async () => {
  await Promise.all([
    store.fetchEquipment(),
    store.fetchEquipmentModels(),
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

const earningsData = computed(() => {
  if (!selectedEquipmentId.value) return [];

  const equipment = store.equipment.find(
    (e) => e.id === selectedEquipmentId.value
  );
  if (!equipment) return [];

  const model = store.getModelById(equipment.equipmentModelId);
  const history = store.stateHistory.find(
    (h) => h.equipmentId === equipment.id
  );
  if (!model || !history) return [];

  const orderedStates = [...history.states].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return orderedStates
    .map((stateEntry, i) => {
      const next = orderedStates[i + 1];
      const isLast = !next;

      const start = new Date(stateEntry.date);
      const end = isLast ? null : new Date(next.date);
      const durationMs = end ? end.getTime() - start.getTime() : 0;

      const state = store.getStateById(stateEntry.equipmentStateId);
      const hourly = model.hourlyEarnings.find(
        (h) => h.equipmentStateId === stateEntry.equipmentStateId
      );

      if (!state) return null;

      if (isLast || !hourly) {
        return {
          key: `${equipment.id}-${i}`,
          equipmentName: equipment.name,
          stateName: state.name,
          durationMs: 0,
          hourlyRate: null,
          total: null,
        };
      }

      const durationHours = durationMs / (1000 * 60 * 60);
      const total = Math.round(durationHours * hourly.value);

      return {
        key: `${equipment.id}-${i}`,
        equipmentName: equipment.name,
        stateName: state.name,
        durationMs,
        hourlyRate: hourly.value,
        total,
      };
    })
    .filter(Boolean);
});
</script>

<style scoped>
.earnings-scroll {
  max-height: 500px;
  overflow-y: auto;
}
</style>
