/** Data */
import {
  equipmentData,
  equipmentModelData,
  equipmentPositionHistoryData,
  equipmentStateData,
  equipmentStateHistoryData
} from '~/data/equipment';

/** Interfaces */
import type {
  IEquipment,
  IEquipmentDetails,
  IEquipmentModel,
  IEquipmentPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory
} from '~/interfaces/equipment';

export function useEquipments() {
  const equipments = ref<IEquipment[]>(equipmentData);
  const equipmentsModel = ref<IEquipmentModel[]>(equipmentModelData);
  const equipmentsPositionHistory = ref<IEquipmentPositionHistory[]>(equipmentPositionHistoryData);
  const equipmentsStateHistory = ref<IEquipmentStateHistory[]>(equipmentStateHistoryData);
  const equipmentState = ref<IEquipmentState[]>(equipmentStateData);

  const recentEquipments = ref<IEquipmentDetails[]>(getEquipmentDetails(
    equipments.value,
    equipmentsModel.value,
    equipmentsPositionHistory.value,
    equipmentsStateHistory.value,
    equipmentState.value,
  ));

  return { recentEquipments };
}
