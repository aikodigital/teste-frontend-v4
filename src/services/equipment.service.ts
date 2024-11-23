import { Equipment } from "@/types/response.types";

export async function fetchEquipments(): Promise<Equipment[]> {
  const response = await fetch("/data/equipment.json");
  if (!response.ok) throw new Error("Failed to fetch equipments");
  const data = await response.json();
  return data;
}
