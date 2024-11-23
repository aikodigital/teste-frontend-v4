import { EquipmentModel } from "@/types/response.types";

export async function fetchEquipmentsModel(): Promise<EquipmentModel[]> {
  const response = await fetch("/data/equipment-model.json");
  if (!response.ok) throw new Error("Failed to fetch equipments model");
  const data = await response.json();
  return data;
}
