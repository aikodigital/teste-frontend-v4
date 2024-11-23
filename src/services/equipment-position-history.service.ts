import { EquipmentPositionHistory } from "@/types/response.types";

export async function fetchEquipmentsPositionHistory(): Promise<
  EquipmentPositionHistory[]
> {
  const response = await fetch("/data/equipment-position-history.json");
  if (!response.ok)
    throw new Error("Failed to fetch equipments position history");
  const data = await response.json();
  return data;
}
