import { useEquipmentLastStates } from '../infra/query/useEquipmentLastStates'
import { TFullState } from '../interfaces/equipmentState.interface'
import { IFullEquipment } from '../interfaces/fullEquipment.interface'
import { useFullEquipments } from './useFullEquipments'

type TUseEquipmentResponse = {
  isLoading: boolean
  equipment?: IFullEquipment
  states: TFullState[]
}

const useFullEquipment = (id: string): TUseEquipmentResponse => {
  const { data: equipments } = useFullEquipments()

  const { data: equipmentLastStates } = useEquipmentLastStates(id)

  const equipment = equipments.find((e) => (e.id = id))

  if (!equipment || !equipmentLastStates) {
    return {
      isLoading: true,
      states: []
    }
  }

  return {
    isLoading: false,
    equipment: equipment,
    states: equipmentLastStates
  }
}

export default useFullEquipment
