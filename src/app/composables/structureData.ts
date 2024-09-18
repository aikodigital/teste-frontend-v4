import { Equipment, EquipmentData, PositionData } from "@/@types";

export function structureData(
  equipmentsData: EquipmentData[],
  positionsData: PositionData[]
): Equipment[] {
  const structuredEquipments = [];

  for (const equipment of equipmentsData) {
    const equipmentPositions = positionsData.find((equipmentPosition) => {
      if (equipment.id === equipmentPosition.equipmentId)
        return equipmentPosition;
    });

    structuredEquipments.push({
      id: equipment.id,
      name: equipment.name,
      currentPosition:
        equipmentPositions?.positions[equipmentPositions?.positions.length - 1],
      positions: equipmentPositions?.positions,
    });
    console.log(
      equipmentPositions?.positions[0],
      equipmentPositions?.positions[equipmentPositions?.positions.length - 1]
    );
  }

  return structuredEquipments;
}
