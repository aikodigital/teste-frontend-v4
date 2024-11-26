import {
  Equipment,
  EquipmentModel,
  EquipmentPositionHistory,
  EquipmentState,
  EquipmentStateHistory,
  ProcessedEquipment,
} from "@/types/equipment.type";

export function getLatestPosition(positionHistory: EquipmentPositionHistory) {
  return positionHistory.positions.reduce(
    (latest, current) =>
      new Date(current.date) > new Date(latest.date) ? current : latest,
    positionHistory.positions[0],
  );
}

export function getLatestState(
  stateHistory: EquipmentStateHistory,
  equipmentStates: EquipmentState[],
) {
  const latestState = stateHistory.states.reduce(
    (latest, current) =>
      new Date(current.date) > new Date(latest.date) ? current : latest,
    stateHistory.states[0],
  );

  return equipmentStates.find(
    (state) => state.id === latestState?.equipmentStateId,
  );
}

export function processEquipmentData(
  equipments: Equipment[],
  equipmentModels: EquipmentModel[],
  equipmentStates: EquipmentState[],
  equipmentStateHistory: EquipmentStateHistory[],
  equipmentPositionHistory: EquipmentPositionHistory[],
): ProcessedEquipment[] {
  return equipments.map((equipment: Equipment) => {
    const model = equipmentModels.find(
      (model) => model.id === equipment.equipmentModelId,
    );

    const positionHistory = equipmentPositionHistory.find(
      (position) => position.equipmentId === equipment.id,
    );

    const latestPosition = positionHistory
      ? getLatestPosition(positionHistory)
      : null;

    const stateHistory = equipmentStateHistory.find(
      (state) => state.equipmentId === equipment.id,
    );

    const latestState = stateHistory
      ? getLatestState(stateHistory, equipmentStates)
      : null;

    return {
      id: equipment.id,
      name: equipment.name,
      model: model?.name,
      position: {
        lat: latestPosition?.lat || 0,
        lon: latestPosition?.lon || 0,
      },
      state: {
        id: latestState?.id,
        name: latestState?.name,
        color: latestState?.color,
      },
    };
  });
}
