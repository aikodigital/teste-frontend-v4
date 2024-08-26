import type Equipment from "~/types/Equipment"

const useEquipments = () => {
  const equipments = useState<Equipment[]>('equipments', () => [])

  const fetchEquipments = async () => {
    const { data: equipments } = await useFetch('/api/equipments')

    return equipments
  }

  return {
    equipments,
    fetchEquipments
  }
}
