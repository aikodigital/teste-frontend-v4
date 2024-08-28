export interface IEquipmentState {
  id: string
  name: string
  color: string
}

export type TFullState = {
  date: string | Date
  state: IEquipmentState
}
