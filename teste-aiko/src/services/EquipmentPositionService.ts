import dayjs from "dayjs";
import { EquipmentJson } from "../types/Equipment";
import { EquipmentPositionHistoryJson, Position } from "../types/EquipmentPositionHistory";

async function getEquipmentsHistoryPositions() {
  const response = await fetch('/data/equipmentPositionHistory.json');

  if (!response.ok) {
    throw new Error('Erro ao buscar os equipamentos');
  }

  const data = await response.json() as Array<EquipmentPositionHistoryJson>;

  return data
}

export async function getEquipmentHistoryPosition(equipment: EquipmentJson) {
  const data = await getEquipmentsHistoryPositions();

  return data.find((position) => position.equipmentId === equipment.id);
}

export async function getLatestEquipmentPosition(equipment: EquipmentJson) {
  const data = await getEquipmentHistoryPosition(equipment);

  if (!data) {
    return null;
  }

  let latestPosition: Position | null = null;

  for (const position of data.positions) {
    if (!latestPosition) {
      latestPosition = position;

      continue;
    }

    if (dayjs(position.date).isAfter(dayjs(latestPosition.date))) {
      latestPosition = position;

      continue;
    }
  }

  return latestPosition as Position;
}
