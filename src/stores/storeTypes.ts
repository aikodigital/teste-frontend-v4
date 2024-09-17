import { IEquipment } from 'utils/globalTypes'

export interface IEquipmentStore {
  equipment: IEquipment[]
  setEquipment: (equipment: IEquipment[]) => void
}

export type equipmentState = {
  id: string
  name: string
  color: string
}

export interface IEquipmentStates {
  equipmentStates: equipmentState[]
  setEquipmentStates: (equipmentStates: equipmentState[]) => void
}
