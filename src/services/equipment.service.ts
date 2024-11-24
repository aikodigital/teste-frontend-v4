import { EquipmentModel } from "@/types/equipment.type";

export async function fetchEquipmentModel(equipmentModelId: string) {
  const response = await fetch("/data/equipment-model.json");
  const data = await response.json();
  return data.find((model: EquipmentModel) => model.id === equipmentModelId);
}
