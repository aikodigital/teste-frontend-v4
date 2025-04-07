<!-- src/components/EquipmentPopup.vue -->
<template>
  <div class="p-4">
    <h2 class="text-lg font-bold">{{ equipment.name }}</h2>
    <p>
      Estado Atual:
      <span :style="{ color: currentState.color }">{{ currentState.name }}</span>
    </p>
    <EquipmentHistory :history="equipmentHistory" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import EquipmentHistory from './EquipmentHistory.vue'
import { useEquipmentStore } from '../stores/equipment.js'

const equipmentStore = useEquipmentStore()
const equipment = computed(() =>
  equipmentStore.selectedEquipment || { id: null, equipmentModelId: null }
)
console.log(equipment)
const currentState = computed(() => {
  return equipmentStore.getCurrentState(equipment.value.id)
})

const equipmentHistory = computed(() => {
  const historyObj = equipmentStore.stateHistories.find(h => h.equipmentId === equipment.value.id)
  if (historyObj) {
    return historyObj.states.map(item => {
      const stateObj = equipmentStore.states.find(s => s.id === item.equipmentStateId)
      return {
        date: item.date,
        stateName: stateObj ? stateObj.name : '',
        stateColor: stateObj ? stateObj.color : '#000'
      }
    })
  }
  return []
})

</script>