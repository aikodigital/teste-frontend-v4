<template>
  <div class="filters">
    <div class="filter-group">
      <label>{{ $t("equipmentFilters.state") }}:</label>
      <select v-model="selectedStateId" class="input">
        <option value="">{{ $t("equipmentFilters.all") }}</option>
        <option v-for="state in states" :key="state.id" :value="state.id">
          {{ state.name }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label>{{ $t("equipmentFilters.model") }}:</label>
      <select v-model="selectedModelId" class="input">
        <option value="">{{ $t("equipmentFilters.all") }}</option>
        <option v-for="model in models" :key="model.id" :value="model.id">
          {{ model.name }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label>{{ $t("equipmentFilters.search") }}:</label>
      <input
        v-model="searchTerm"
        type="text"
        :placeholder="$t('equipmentFilters.searchPlaceholder')"
        class="input"
      />
    </div>

    <button
      class="toggle-path"
      :class="{ active: showPathMode }"
      @click="togglePathMode"
    >
      {{
        showPathMode
          ? $t("equipmentFilters.deactivatePathMode")
          : $t("equipmentFilters.activatePathMode")
      }}
    </button>

    <div v-if="showPathMode" class="date-filters">
      <div class="filter-group">
        <label>{{ $t("equipmentFilters.startDate") }}:</label>
        <input v-model="startDate" type="date" class="input" />
      </div>
      <div class="filter-group">
        <label>{{ $t("equipmentFilters.endDate") }}:</label>
        <input v-model="endDate" type="date" class="input" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, defineEmits } from "vue";
import { useEquipmentDataStore } from "@/store/equipmentDataStore";

const emit = defineEmits<{
  (
    e: "filter-change",
    filters: {
      modelId: string;
      stateId: string;
      search: string;
      startDate: string;
      endDate: string;
    }
  ): void;
  (e: "toggle-path-mode", enabled: boolean): void;
}>();

const dataStore = useEquipmentDataStore();

const selectedModelId = ref("");
const selectedStateId = ref("");
const searchTerm = ref("");
const showPathMode = ref(false);
const startDate = ref("");
const endDate = ref("");

const models = ref<
  {
    id: string;
    name: string;
    hourlyEarnings: { equipmentStateId: string; value: number }[];
  }[]
>([]);
const states = ref<{ id: string; name: string; color: string }[]>([]);

watch(
  [selectedModelId, selectedStateId, searchTerm, startDate, endDate],
  () => {
    emit("filter-change", {
      modelId: selectedModelId.value,
      stateId: selectedStateId.value,
      search: searchTerm.value.trim(),
      startDate: startDate.value,
      endDate: endDate.value,
    });
  }
);

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

.date-filters {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-top: 0.5rem;
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
</style>
