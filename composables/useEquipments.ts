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

/**
 * Composable para gerenciar os dados dos equipamentos
 * @returns {Object} - Objeto contendo a referência para os equipamentos
 */
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
