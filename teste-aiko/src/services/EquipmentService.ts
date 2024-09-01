import { Equipment, EquipmentJson } from "../types/Equipment";
import { getEquipmentModelById } from "./EquipmentModelService";
import { getLatestEquipmentPosition } from "./EquipmentPositionService";
import { getLatestEquipmentStateHistory } from "./EquipmentStateHistoryService";

export async function getEquipments(relations: Array<"position" | "state" | "model"> = []): Promise<Array<Equipment>> {
  const response = await fetch('/data/equipment.json');

  if (!response.ok) {
    throw new Error('Erro ao buscar os equipamentos');
  }

  const data = await response.json() as Array<EquipmentJson>;

  if (relations.length == 0) {
    return data
  }

  const results = await Promise.allSettled(data.map(async (equipment) => {
    const _equipment: Equipment = { ...equipment };

    if (relations.includes("position")) {
      const position = await getLatestEquipmentPosition(equipment);

      if (position) {
        _equipment.position = position;
      }
    }

    if (relations.includes("model")) {
      const model = await getEquipmentModelById(equipment.equipmentModelId);

      if (model) {
        _equipment.model = model;
      }
    }

    if (relations.includes("state")) {
      const state = await getLatestEquipmentStateHistory(equipment);

      if (state) {
        _equipment.state = state;
      }
    }

    return _equipment;
  }));

  return results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
}