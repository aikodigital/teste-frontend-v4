<template>
  <Dialog v-model:visible="visible" :header="equipment.name" :style="{ width: '60vw' }">
    <div class="py-4 flex justify-between items-center">
      <p><strong>Modelo: </strong> {{ equipmentModel?.name }}</p>
      <p><strong>Modelo ID: </strong> {{ equipmentModel?.id }}</p>
      <p> <strong>Estado atual: </strong> 
        <span v-if="currentState" :style="{ color: currentState.color }">
          {{ currentState.name }}
        </span>
        <span v-else>Não disponível</span>
      </p>
    </div>
    <Button label="Ver histórico de estados" @click="showStateHistory = true" />
  </Dialog>
  <EquipmentStateHistory
    v-if="showStateHistory"
    :equipment-id="equipment.id"
    @close="showStateHistory = false"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useEquipmentStore } from '@/stores/equipment'
import type { Equipment, EquipmentState } from '@/types'

const props = defineProps<{
  equipment: Equipment
}>()

const emit = defineEmits(['close'])

const store = useEquipmentStore()
const visible = ref(true)
const showStateHistory = ref(false)

const equipmentModel = computed(() =>
  store.equipmentModels.find(m => m.id === props.equipment.equipmentModelId)
)

const currentState = computed(() => {
  const latestStateEntry = store.getLatestState(props.equipment.id)
  return latestStateEntry
    ? store.equipmentStates.find(state => state.id === latestStateEntry.equipmentStateId)
    : null
})

watch(visible, (newValue) => {
  if (!newValue) emit('close')
})
</script>
