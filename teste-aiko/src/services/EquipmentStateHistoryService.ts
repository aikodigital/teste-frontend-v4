import { EquipmentStateHistoryItem, EquipmentStateHistoryJson } from "@/types/EquipmentStateHistory";
import { EquipmentJson } from "../types/Equipment";
import { getEquipmentStateById } from "./EquipmentStateService";
import dayjs from "dayjs";

async function getEquipmentsStateHistory() {
  const response = await fetch('/data/equipmentStateHistory.json');

  if (!response.ok) {
    throw new Error('Erro ao buscar os equipamentos');
  }

  const data = await response.json() as Array<EquipmentStateHistoryJson>;

  return data
}

export async function getEquipmentStateHistory(equipment: EquipmentJson) {
  const data = await getEquipmentsStateHistory();

  return data.find((position) => position.equipmentId === equipment.id);
}


export async function getLatestEquipmentStateHistory(equipment: EquipmentJson) {
  const data = await getEquipmentStateHistory(equipment);

  if (!data) {
    return null;
  }

  let latestEquipmentState: { equipmentStateId: string, date: string } | null = null;

  for (const state of data.states) {
    if (!latestEquipmentState) {
      latestEquipmentState = state;

      continue;
    }

    if (dayjs(state.date).isAfter(dayjs(latestEquipmentState.date))) {
      latestEquipmentState = state;

      continue;
    }
  }

  if (!latestEquipmentState) {
    return null;
  }

  const state = await getEquipmentStateById(latestEquipmentState.equipmentStateId)

  return {
    ...latestEquipmentState,
    ...state,
  } as EquipmentStateHistoryItem
}