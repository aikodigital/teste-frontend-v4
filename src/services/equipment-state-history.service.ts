import { EquipmentStateHistory } from "@/types/response.types";

export async function fetchEquipmentsStateHistory(): Promise<
  EquipmentStateHistory[]
> {
  const response = await fetch("/data/equipment-state-history.json");
  if (!response.ok) throw new Error("Failed to fetch equipments state history");
  const data = await response.json();
  return data;
}
