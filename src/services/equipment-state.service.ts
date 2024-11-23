import { EquipmentState } from "@/types/response.types";

export async function fetchEquipmentsState(): Promise<EquipmentState[]> {
  const response = await fetch("/data/equipment-state.json");
  if (!response.ok) throw new Error("Failed to fetch equipments state");
  const data = await response.json();
  return data;
}
