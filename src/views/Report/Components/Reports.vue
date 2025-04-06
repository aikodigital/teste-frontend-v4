<template>
  <div class="container py-4">
    <div class="table-responsive">
      <table
        class="table table-bordered table-striped table-hover align-middle"
      >
        <thead class="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Modelo</th>
            <th scope="col">Último Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="eq in equipmentWithDetails" :key="eq.id">
            <td>{{ eq.id }}</td>
            <td>{{ eq.name }}</td>
            <td>{{ eq.modelName }}</td>
            <td>
              <span class="badge" :class="getBadgeClass(eq.latestState)">
                {{ eq.latestState }}
              </span>
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
    store.fetchStateHistory(),
    store.fetchStates(),
  ]);
});

const equipmentWithDetails = computed(() => {
  return store.equipment.map((equipment) => {
    const model = store.getModelById(equipment.equipmentModelId);
    const latestState = store.getLatestState(equipment.id);
    const stateDetails = latestState
      ? store.getStateById(latestState.equipmentStateId)
      : undefined;

    return {
      ...equipment,
      modelName: model?.name ?? "Modelo não encontrado",
      latestState: stateDetails?.name ?? "Estado não encontrado",
    };
  });
});

function getBadgeClass(stateName: string) {
  switch (stateName.toLowerCase()) {
    case "ativo":
    case "operando":
      return "bg-success";
    case "inativo":
    case "em manutenção":
      return "bg-warning text-dark";
    case "desativado":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
}
</script>
