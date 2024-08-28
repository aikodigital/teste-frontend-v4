import type Equipment from "~/types/Equipment"
import type EquipmentFilters from "~/types/EquipmentFilters"
import type EquipmentModel from "~/types/EquipmentModel"
import type EquipmentState from "~/types/EquipmentState"

export const useEquipments = () => {
  const equipments = useState<Equipment[]>('equipments', () => [])
  const models = useState<EquipmentModel[]>('models', () => [])
  const states = useState<EquipmentState[]>('states', () => [])

  const fetchEquipmentData = async (): Promise<void> => {
    const { data: equipmentData } = await useFetch('/api/equipments')
    if (equipmentData.value) {
      equipments.value = equipmentData.value.equipments
      models.value = equipmentData.value.models
      states.value = equipmentData.value.states
    }
  }

  const getEquipment = (id: string): Equipment | null => {
    return equipments.value.find(equipment => equipment.id === id) ?? null
  }

  return {
    equipments,
    models,
    states,
    fetchEquipmentData,
    getEquipment,
  }
}
