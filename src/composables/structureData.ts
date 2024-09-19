import {
  Equipment,
  EquipmentData,
  EquipmentState,
  PositionData,
  StatesHistoryData,
} from "@/@types";

import statesData from "@/data/equipmentState.json";

export function structureEquipmentData(
  equipments: EquipmentData[],
  equipmentsPositions: PositionData[],
  equipmentsStates: StatesHistoryData[]
): Equipment[] {
  const structuredEquipments = [];

  for (const equipment of equipments) {
    const equipmentPositions = equipmentsPositions.find(
      (equipmentPosition) => equipment.id === equipmentPosition.equipmentId
    );

    const structuredEquipmentStates = equipmentsStates
      .find((equipmentState) => equipment.id === equipmentState.equipmentId)
      ?.states.map((state) => {
        const structuredState = statesData.find(
          (stateData) => state.equipmentStateId === stateData.id
        );
        if (!structuredState) return;
        return {
          name: structuredState.name,
          color: structuredState.color,
          date: state.date,
        };
      })
      .filter((equipment) => !!equipment) as EquipmentState[];

    const lastItemFromEquipmentsStates =
      structuredEquipmentStates[structuredEquipmentStates?.length - 1];

    const lastItemFromEquipmentPositions =
      equipmentPositions?.positions[equipmentPositions?.positions.length - 1];

    structuredEquipments.push({
      id: equipment.id,
      name: equipment.name,
      currentPosition: lastItemFromEquipmentPositions,
      historyPositions: equipmentPositions?.positions,
      currentState: lastItemFromEquipmentsStates,
      historyStates: structuredEquipmentStates,
    });
  }

  return structuredEquipments;
}
