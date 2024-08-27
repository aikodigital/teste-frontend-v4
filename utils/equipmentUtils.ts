/** Interfaces */
import type {
  IEquipment,
  IEquipmentModel,
  IEquipmentPositionHistory,
  IEquipmentState,
  IEquipmentStateHistory
} from '~/interfaces/equipment';

export function getCurrentStateClass(state: IEquipmentState) {
  return state.name === 'Operando' ? 'text-operando'
    : state.name === 'Parado' ? 'text-parado'
      : 'text-manutencao';
}

function getModel(equipment: IEquipment, equipmentsModel: IEquipmentModel[]) {
  return equipmentsModel.find((model) => model.id === equipment.equipmentModelId);
}

function getPositionHistory(equipment: IEquipment, equipmentsPositionHistory: IEquipmentPositionHistory[]) {
  return equipmentsPositionHistory.find((positionHistory) => positionHistory.equipmentId === equipment.id)?.positions || [];
}

function getStateHistory(equipment: IEquipment, equipmentsStateHistory: IEquipmentStateHistory[]) {
  return equipmentsStateHistory.find((stateHistory) => stateHistory.equipmentId === equipment.id)?.states || [];
}

function getCurrentPosition(positionHistory: { lat: number; lon: number }[]) {
  return positionHistory[positionHistory.length - 1];
}

function getCurrentState(stateHistory: { date: string; equipmentStateId: string }[], equipmentState: IEquipmentState[]) {
  const lastState = stateHistory[stateHistory.length - 1];

  return equipmentState.find((state) => state.id === lastState.equipmentStateId);
}

export function getEquipmentDetails(
  equipments: IEquipment[],
  equipmentsModel: IEquipmentModel[],
  equipmentsPositionHistory: IEquipmentPositionHistory[],
  equipmentsStateHistory: IEquipmentStateHistory[],
  equipmentState: IEquipmentState[]
) {
  return equipments.map((equipment) => {
    const model = getModel(equipment, equipmentsModel);
    const positionHistory = getPositionHistory(equipment, equipmentsPositionHistory);
    const stateHistory = getStateHistory(equipment, equipmentsStateHistory);
    const currentPosition = getCurrentPosition(positionHistory);
    const currentState = getCurrentState(stateHistory, equipmentState);

    return {
      id: equipment.id,
      name: equipment.name,
      model,
      currentState,
      stateHistory,
      currentPosition,
      positionHistory,
    };
  });
}
