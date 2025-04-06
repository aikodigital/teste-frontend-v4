<script lang="ts" setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import type { IEquipment, IEquipmentStateHistory, IEquipmentPositionHistory } from '@/types/equipment.types'

import { useEquipmentsLoader } from '@/composables/useEquipmentsLoader'

import EquipmentsList from '@/components/Equipments/EquipmentsList.vue'

const EquipmentModal = defineAsyncComponent(() => import('@/components/Equipments/EquipmentModal.vue'))

const {
  equipments,
  equipmentStates,
  equipmentsModels,
  equipmentsPositionHistory,
  equipmentsStateHistory,
  loading,
} = useEquipmentsLoader()

const modalActive = ref(false)
const selectedEquipment = ref<IEquipment | null>(null)

const selectedEquipmentPositionHistory = computed<IEquipmentPositionHistory[]>(() => {
  if (!selectedEquipment.value) return []
  return equipmentsPositionHistory.value.filter(item => item.equipmentId === selectedEquipment.value!.id)
})

const selectedEquipmentStateHistory = computed<IEquipmentStateHistory[]>(() => {
  if (!selectedEquipment.value) return []
  return equipmentsStateHistory.value.filter(item => item.equipmentId === selectedEquipment.value!.id)
})

const openEquipmentModal = (equipment: IEquipment) => {
  selectedEquipment.value = equipment
  modalActive.value = true
}

const onCloseEquipmentModal = () => {
  selectedEquipment.value = null
  modalActive.value = false
}
</script>

<template>
  <BaseCardTitle
    title="Gestão de equipamentos"
    icon="mdi-tractor"
  />
  
  <v-card
    flat
    class="mt-4"
  >
    <BaseLoadingSpinner
      v-if="loading"
      size="48px"
      border-width="6px"
    />
    <EquipmentsList
      v-else
      :equipments="equipments"
      :equipments-models="equipmentsModels"
      :equipment-states="equipmentStates"
      :equipment-state-history="selectedEquipmentStateHistory"
      @equipment-click="openEquipmentModal"
    />
    <EquipmentModal 
      v-if="modalActive && selectedEquipment"
      :equipment="selectedEquipment"
      :equipments-models="equipmentsModels"
      :equipment-states="equipmentStates"
      :equipment-state-history="selectedEquipmentStateHistory"
      :equipment-position-history="selectedEquipmentPositionHistory"
      @on-close="onCloseEquipmentModal"
    />
  </v-card>
</template>


<style lang="scss" scoped>
  
</style>
