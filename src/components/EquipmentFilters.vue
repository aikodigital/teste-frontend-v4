<template>
  <div class="filters">
    <label>
      Estado:
      <select v-model="selectedStateId">
        <option value="">Todos</option>
        <option v-for="state in states" :key="state.id" :value="state.id">
          {{ state.name }}
        </option>
      </select>
    </label>

    <label>
      Modelo:
      <select v-model="selectedModelId">
        <option value="">Todos</option>
        <option v-for="model in models" :key="model.id" :value="model.id">
          {{ model.name }}
        </option>
      </select>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineEmits } from "vue";
import { useEquipmentDataStore } from "@/store/equipmentDataStore";

const emit = defineEmits<{
  (e: "filter-change", filters: { modelId: string; stateId: string }): void;
}>();

const dataStore = useEquipmentDataStore();

const selectedModelId = ref("");
const selectedStateId = ref("");

const models = ref(dataStore.equipmentModels);
const states = ref(dataStore.states);

watch([selectedModelId, selectedStateId], () => {
  emit("filter-change", {
    modelId: selectedModelId.value,
    stateId: selectedStateId.value,
  });
});

onMounted(async () => {
  await dataStore.fetchEquipmentModels();
  await dataStore.fetchStates();
  models.value = dataStore.equipmentModels;
  states.value = dataStore.states;
});
</script>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
  padding: 1rem;
}
select {
  padding: 0.25rem;
}
</style>
