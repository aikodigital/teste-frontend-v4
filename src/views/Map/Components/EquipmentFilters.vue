<template>
  <div class="filters">
    <div class="filter-group">
      <label>Estado:</label>
      <select v-model="selectedStateId" class="input">
        <option value="">Todos</option>
        <option v-for="state in states" :key="state.id" :value="state.id">
          {{ state.name }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label>Modelo:</label>
      <select v-model="selectedModelId" class="input">
        <option value="">Todos</option>
        <option v-for="model in models" :key="model.id" :value="model.id">
          {{ model.name }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label>Pesquisar:</label>
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Digite nome ou código"
        class="input"
      />
    </div>

    <button
      class="toggle-path"
      :class="{ active: showPathMode }"
      @click="togglePathMode"
    >
      {{ showPathMode ? "Desativar modo trajeto" : "Ativar modo trajeto" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineEmits } from "vue";
import { useEquipmentDataStore } from "@/store/equipmentDataStore";

const emit = defineEmits<{
  (
    e: "filter-change",
    filters: { modelId: string; stateId: string; search: string }
  ): void;
  (e: "toggle-path-mode", enabled: boolean): void;
}>();

const dataStore = useEquipmentDataStore();

const selectedModelId = ref("");
const selectedStateId = ref("");
const searchTerm = ref("");
const showPathMode = ref(false);

const models = ref<
  {
    id: string;
    name: string;
    hourlyEarnings: { equipmentStateId: string; value: number }[];
  }[]
>([]);
const states = ref<{ id: string; name: string; color: string }[]>([]);

watch([selectedModelId, selectedStateId, searchTerm], () => {
  emit("filter-change", {
    modelId: selectedModelId.value,
    stateId: selectedStateId.value,
    search: searchTerm.value.trim(),
  });
});

function togglePathMode() {
  showPathMode.value = !showPathMode.value;
  emit("toggle-path-mode", showPathMode.value);
}

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
  gap: calc(100% / 30);
  padding: 1rem;
  flex-wrap: wrap;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  min-width: 180px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
}

.toggle-path {
  padding: 0.6rem 1.2rem;
  font-weight: 500;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
  transition: background-color 0.2s ease, color 0.2s ease;
  height: fit-content;
}

.toggle-path:hover {
  background-color: #f3f4f6;
}

.toggle-path.active {
  background-color: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}
</style>
