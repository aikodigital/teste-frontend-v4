<template>
  <div class="container py-4">
    <h2 class="mb-4 text-center">📍 Localização Atual dos Equipamentos</h2>

    <div class="table-responsive">
      <table class="table table-bordered table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Modelo</th>
            <th scope="col">Última Localização</th>
            <th scope="col">Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="eq in equipmentWithLatestPosition" :key="eq.id">
            <td>{{ eq.name }}</td>
            <td>{{ eq.modelName }}</td>
            <td>
              {{
                eq.latestPosition
                  ? `${eq.latestPosition.lat}, ${eq.latestPosition.lon}`
                  : "Localização não encontrada"
              }}
            </td>
            <td>
              <span v-if="eq.latestPosition" class="text-muted">
                📅 {{ formatDate(eq.latestPosition.date) }}
              </span>
              <span v-else class="text-muted">–</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useEquipmentDataStore } from "@/store/equipmentDataStore";

const store = useEquipmentDataStore();

onMounted(async () => {
  await Promise.all([
    store.fetchEquipment(),
    store.fetchEquipmentModels(),
    store.fetchPositions(),
  ]);
});

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

const equipmentWithLatestPosition = computed(() => {
  return store.equipment.map((equipment) => {
    const model = store.getModelById(equipment.equipmentModelId);
    const positionHistory = store.positions
      .filter((p) => p.equipmentId === equipment.id)
      .flatMap((p) => p.positions)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const latestPosition = positionHistory[positionHistory.length - 1];

    return {
      ...equipment,
      modelName: model?.name ?? "Modelo não encontrado",
      latestPosition,
    };
  });
});
</script>
