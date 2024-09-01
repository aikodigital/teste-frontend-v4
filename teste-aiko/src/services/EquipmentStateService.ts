import { EquipmentStateJson } from "@/types/EquipmentState";

export async function getEquipmentStates() {
  const response = await fetch('/data/equipmentState.json');

  if (!response.ok) {
    throw new Error('Erro ao buscar os estados');
  }

  const data = await response.json();

  return data as Array<EquipmentStateJson>;
}

export async function getEquipmentStateById(id: string) {
  const data = await getEquipmentStates();

  return data.find((state) => state.id === id);
}