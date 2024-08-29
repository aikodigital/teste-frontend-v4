<script setup lang="ts">
import { ref, watch } from 'vue';
import Map from '~/components/Map.vue'
import SelectButton from '~/components/form/SelectButton.vue';
import type { Equipment, EquipmentStatus } from '~/models/Equipment';
import equipments from '../../data/equipment.json'
import equipmentStates from '../../data/equipmentState.json'

const equipmentFiltered = ref()
const statusFiltered = ref()

function equipmentOptions(equipments: Array<Equipment>) {
  return equipments.map(({ equipmentModelId, ...rest }) => rest);
}

function equipmentStatus(equipmentStates: Array<EquipmentStatus>) {
  return equipmentStates.map(({ color, ...rest }) => rest);
}

function clearFilters() {
  equipmentFiltered.value = undefined
  statusFiltered.value = undefined
}
</script>

<template>
  <div class="grid w-full h-full min-h-[100vh] items-center">
    <div class="flex mx-auto">
      <img
        class="object-scale-down aspect-w-3 aspect-h-2 w-[100px]"
        src="/src/assets/aiko.png"
      />
    </div>
    <div class="flex flex-col sm:flex-row h-[40rem] w-[90%] mx-auto mb-[5rem] gap-2">
      <div class="grid grid-cols-2 items-start justify-start border border-neutral rounded-lg bg-base-200 w-full sm:w-1/3">
        <div class="flex w-full h-[100px] border-b border-neutral col-span-2 p-8 justify-between">
          <h1
          class="text-xl font-bold"
          >
            Filtros
          </h1>
          <button
            class="text-sm border-neutral border rounded-lg px-2 bg-neutral hover:bg-base-300 hover:text-base-content transition-all duration-150"
            type="button"
            @click="clearFilters"
          >
            Limpar filtros
          </button>
        </div>
        <div class="flex w-full border-b border-neutral col-span-2 p-7 gap-x-2">
          <SelectButton
            v-model="equipmentFiltered"
            :options="equipmentOptions(equipments)"
            label="Filtrar por equipamento:"
          />
          <SelectButton
            v-model="statusFiltered"
            :options="equipmentStatus(equipmentStates)"
            label="Filtrar por status:"
          />
        </div>
      </div>
      <div class="h-full w-full sm:w-2/3">
        <Map
          :equipment-filtered="equipmentFiltered"
          class="rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s ease-out;
}
.slide-fade-enter-from {
  transform: translateY(20px);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
