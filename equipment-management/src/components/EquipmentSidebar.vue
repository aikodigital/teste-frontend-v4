<!-- EquipmentSidebar.vue -->
<template>
  <div
    class="right-3 top-3 min-w-3xs md:w-1/3 w-1/3 bg-white shadow-xl h-150 rounded-lg p-6overflow-y-auto absolute p-6 bottom-16 overflow-y-scroll z-30">
    <button @click="emit('close')" class="absolute top-3 right-3 text-gray-500 hover:text-gray-900">
      ✕
    </button>

    <h2 class="text-4xl !font-bold mb-4">{{ equipment.name }}</h2><br>
    <div class="space-y-4">
      <div class="!font-semibold">
        <label class="text-xl">Modelo</label>
        <p class="font-medium text-2xl">{{ equipment.model?.name }}</p>
      </div>

      <div>
        <div :style="{ backgroundColor: currentState?.state?.color }"
          class="ml-2 !my-3 p-2 rounded-4xl text-lg w-40 text-center !font-semibold text-gray-700">
          {{ currentState?.state?.name }}
        </div>
      </div>

      <div class="border-b-gray-300 border-b-1 pb-2">
        <label class="text-xl">Última Posição</label>
        <p class="font-medium text-lg">{{ formattedPosition }}</p>
        <p class="text-sm text-gray-500">{{ lastPositionDate }}</p>
      </div>
      <div class="!my-3">
        <label class="text-xl">Últimos Estados</label>
        <div class="overflow-y-auto max-h-32 max-w-42 border border-gray-300 rounded p-2">
          <p v-if="!formattedStateHistory.length" class="text-gray-500">Nenhum estado encontrado</p>
          <ul class="mt-1">
            <li v-for="(state, index) in formattedStateHistory" :key="index">
              <p>{{ state.name }}</p>
              <p class="text-sm text-gray-500 border-b-1 border-b-gray-300">{{ state.date }}</p>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEquipmentStore } from '../stores/equipment.js'

const props = defineProps({
  equipment: {
    type: Object,
    required: true
  }
})

const equipmentStore = useEquipmentStore()

const emit = defineEmits(['close'])

const currentState = computed(() => {
  if (!props.equipment?.id) return null
  return equipmentStore.getCurrentState(props.equipment.id)
})
console.log("props", props)

const formattedStateHistory = computed(() => {
  if (!props.equipment?.stateHistory || !Array.isArray(props.equipment.stateHistory)) {
    return [];
  }
  return props.equipment.stateHistory.map(item => {
    const stateObj = equipmentStore.states.find(s => s.id === item.equipmentStateId);
    return {
      date: item.date ? new Date(item.date).toLocaleString() : 'N/A',
      name: stateObj ? stateObj.name : 'Unknown',
    };
  });
});

const formattedPosition = computed(() => {
  const pos = props.equipment.lastPosition
  return pos ? `Lat: ${pos.lat.toFixed(4)}, Lon: ${pos.lon.toFixed(4)}` : 'N/A'
})

const lastPositionDate = computed(() => {
  return props.equipment.lastPosition?.date
    ? new Date(props.equipment.lastPosition.date).toLocaleString()
    : ''
})

/* watch(() => props.equipment, (newVal) => {
  console.log('Equipment changed:', newVal)
}, { immediate: true })

watch(currentState, (newVal) => {
  console.log('Current state changed:', newVal)
}, { immediate: true }) */
</script>