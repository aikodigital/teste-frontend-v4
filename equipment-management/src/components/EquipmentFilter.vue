<template>
  <div class="max-w-sm">
    <label class="block !mb-2 text-lg text-gray-900 dark:text-white">Filtros </label>
    <select v-model="selectedState" @change="applyFilters"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 !mb-4 dark:focus:border-blue-500">
      <option value="">Estados</option>
      <option v-for="state in states" :key="state.id" :value="state.id">
        {{ state.name }}
      </option>
    </select>
    <select v-model="selectedModel" @change="applyFilters"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option value="">Modelos</option>
      <option v-for="model in models" :key="model.id" :value="model.id">
        {{ model.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useEquipmentStore } from '../stores/equipment.js'

const selectedState = ref('')
const selectedModel = ref('')
const equipmentStore = useEquipmentStore()

const states = computed(() => equipmentStore.states)
const models = computed(() => equipmentStore.models)

onMounted(async () => {
  console.log("EquipmentFilter mounted, loading data...")
  await equipmentStore.loadInitialData()
  console.log("States loaded:", states.value)
  console.log("Models loaded:", models.value)
})

function applyFilters() {
  console.log("Applying filters:", {
    state: selectedState.value,
    model: selectedModel.value
  })
  equipmentStore.filterEquipments({
    state: selectedState.value,
    model: selectedModel.value
  })
}
</script>