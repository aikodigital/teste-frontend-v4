<template>
  <div class="flex lg:space-x-8 justify-between">
    <Dropdown v-model="selectedState" :options="stateOptions" optionLabel="name" optionValue="id" 
      placeholder="Filtrar por estado" @change="applyStateFilter"
      class="dropdown"/>
    <Dropdown v-model="selectedModel" :options="modelOptions" optionLabel="name" optionValue="id"
      placeholder="Filtrar por modelo" @change="applyModelFilter" class="dropdown"/>
  </div>
</template>

<style scss>
span{
  @apply outline-none;
}
.dropdown{
  @apply w-48 outline-none flex justify-between items-center border border-gray-300 p-3 rounded-md text-surface-400;
}
#pv_id_1_list, #pv_id_2_list {
  @apply bg-surface-0 border-gray-300 outline-none leading-[normal] m-0 p-3 rounded-md text-surface-400 shadow-xl;

  span {
    @apply text-surface-400 leading-[normal] outline-none cursor-pointer;
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEquipmentStore } from '@/stores/equipment'

const store = useEquipmentStore()

const selectedState = ref<string | null>(null);
const selectedModel = ref<string | null>(null);


const stateOptions = computed(() => [
  { id: null, name: 'Todos os estados' },
  ...store.equipmentStates
])

const modelOptions = computed(() => [
  { id: null, name: 'Todos os modelos' },
  ...store.equipmentModels
])

function applyStateFilter() {
  store.setStateFilter(selectedState.value)
}

function applyModelFilter() {
  store.setModelFilter(selectedModel.value)
}
</script>
