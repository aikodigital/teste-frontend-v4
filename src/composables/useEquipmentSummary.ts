import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import {
  type IEquipmentSummary,
  type IEquipment,
  type IEquipmentModel,
  type IEquipmentStateDefinition,
  type IEquipmentPositionHistory,
  type IEquipmentStateHistory
} from '@/types/equipment.types'
import { getEquipmentSummary } from '@/utils/utils'

export function useEquipmentSummary(
  params: {
    equipments: Ref<IEquipment[]>,
    equipmentsModels: Ref<IEquipmentModel[]>,
    equipmentStates: Ref<IEquipmentStateDefinition[]>,
    equipmentsPositionHistory: Ref<IEquipmentPositionHistory[]>,
    equipmentsStateHistory: Ref<IEquipmentStateHistory[]>
  }
) {
  const mappedEquipmentList = ref<IEquipmentSummary[]>([])

  watch(
    () => [
      params.equipments.value,
      params.equipmentsModels.value,
      params.equipmentStates.value,
      params.equipmentsPositionHistory.value,
      params.equipmentsStateHistory.value
    ],
    () => {
      const allLoaded =
        params.equipments.value.length &&
        params.equipmentsModels.value.length &&
        params.equipmentStates.value.length &&
        params.equipmentsPositionHistory.value.length &&
        params.equipmentsStateHistory.value.length

      if (allLoaded) {
        mappedEquipmentList.value = getEquipmentSummary(
          params.equipments.value,
          params.equipmentsModels.value,
          params.equipmentStates.value,
          params.equipmentsPositionHistory.value,
          params.equipmentsStateHistory.value
        )
      }
    },
    { immediate: true }
  )

  return {
    mappedEquipmentList,
  }
}