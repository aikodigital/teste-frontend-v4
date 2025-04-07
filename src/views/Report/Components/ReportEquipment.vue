<template>
  <div class="container py-4">
    <h2 class="mb-4 text-center">📘 {{ $t("reportEquipment.title") }}</h2>

    <div id="equipmentHistoryAccordion" class="accordion">
      <div
        v-for="(eq, index) in equipmentWithHistory"
        :key="eq.id"
        class="accordion-item"
      >
        <h2 :id="`heading-${index}`" class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapse-${index}`"
            aria-expanded="false"
            :aria-controls="`collapse-${index}`"
          >
            {{ eq.name }} ({{ $t("reportEquipment.model") }}:
            {{ eq.modelName }})
          </button>
        </h2>
        <div
          :id="`collapse-${index}`"
          class="accordion-collapse collapse"
          :aria-labelledby="`heading-${index}`"
          data-bs-parent="#equipmentHistoryAccordion"
        >
          <div class="accordion-body">
            <ul class="list-group">
              <li
                v-for="state in eq.history"
                :key="state.date"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {{ state.stateName }}
                </span>
                <span class="badge bg-primary">
                  {{ formatDate(state.date) }}
                </span>
              </li>
              <li
                v-if="eq.history.length === 0"
                class="list-group-item text-muted"
              >
                {{ $t("reportEquipment.noHistory") }}
              </li>
            </ul>
          </div>
        </div>
      </div>
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
    store.fetchStates(),
    store.fetchStateHistory(),
  ]);
});

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

const equipmentWithHistory = computed(() => {
  return store.equipment.map((equipment) => {
    const model = store.getModelById(equipment.equipmentModelId);
    const history = store.stateHistory.find(
      (h) => h.equipmentId === equipment.id
    );

    const detailedHistory =
      history?.states.map((s) => {
        const stateDetails = store.getStateById(s.equipmentStateId);
        return {
          stateName: stateDetails?.name ?? "Estado não encontrado",
          date: s.date,
        };
      }) ?? [];

    return {
      ...equipment,
      modelName: model?.name ?? "Modelo não encontrado",
      history: detailedHistory,
    };
  });
});
</script>
<style scoped></style>
