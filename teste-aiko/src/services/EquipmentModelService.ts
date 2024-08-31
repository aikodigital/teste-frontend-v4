import { EquipmentModelJson } from "../types/EquipmentModel"

export async function getEquimentModels() {
  const response = await fetch('/data/equipmentModel.json')

  if (!response.ok) {
    throw new Error('Erro ao buscar os modelos de equipamentos')
  }

  const data = await response.json()

  return data as Array<EquipmentModelJson>;
}

export async function getEquipmentModelById(id: string) {
  const data = await getEquimentModels();

  return data.find((model) => model.id === id);
}