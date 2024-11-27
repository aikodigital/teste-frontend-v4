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

// export function calculateHoursWorked(
//   stateHistory: EquipmentStateHistory,
// ): number {
//   let totalHours = 0;

//   // Order States History by date
//   stateHistory.states.sort(
//     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
//   );

//   // Calculate the difference of hours between consecutive states
//   for (let i = 1; i < stateHistory.states.length; i++) {
//     const prevState = stateHistory.states[i - 1];
//     const currentState = stateHistory.states[i];

//     const prevDate = new Date(prevState.date).getTime();
//     const currentDate = new Date(currentState.date).getTime();

//     const timeDiff = currentDate - prevDate;
//     totalHours += timeDiff / (1000 * 60 * 60);
//   }

//   return totalHours;
// }

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
      equipmentModel: model,
      stateHistory,
    };
  });
}
