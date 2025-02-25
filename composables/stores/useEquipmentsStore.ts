import type { EquipmentResponse } from "@dtos/Equipment"
import type { EquipmentStateHistory } from "@dtos/EquipmentStateHistory"
import type { EquipmentsState } from "~/server/dtos/EquipmentState"

export const useEquipmentsStore = defineStore('useEquipments', () => {
  const equipments = ref<EquipmentResponse[]>([])
  const equipmentSelected = ref<EquipmentResponse | null>(null)
  const equipmentStateHistorySelected = ref<EquipmentStateHistory | null>(null)
  const equipmentsStates = ref<EquipmentsState>([])

  return {
    equipments,
    equipmentSelected,
    equipmentStateHistorySelected,
    equipmentsStates
  }
})