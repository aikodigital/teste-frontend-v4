import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEquipmentStore } from '@/stores/equipment.store'

export function useEquipmentsLoader() {
  const equipmentStore = useEquipmentStore()
  const {
    equipments,
    equipmentStates,
    equipmentsModels,
    equipmentsPositionHistory,
    equipmentsStateHistory,
    loading,
  } = storeToRefs(equipmentStore)

  onMounted(async () => {
    await Promise.all([
      equipmentStore.getEquipments(),
      equipmentStore.getEquipmentModels(),
      equipmentStore.getEquipmentStates(),
      equipmentStore.getEquipmentsStateHistory(),
      equipmentStore.getEquipmentsPositionHistory(),
    ])
  })

  return {
    equipments,
    equipmentStates,
    equipmentsModels,
    equipmentsPositionHistory,
    equipmentsStateHistory,
    loading,
  }
}