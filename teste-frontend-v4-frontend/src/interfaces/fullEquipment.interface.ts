import { TMarker } from '../components/Map'
import { IEquipmentState } from './equipmentState.interface'

export type TFullHourlyEarnings = {
  equipmentStateId: string
  state: IEquipmentState
  value: number
}

export interface IFullEquipmentModel {
  id: string
  name: string
  hourlyEarnings: TFullHourlyEarnings[]
}

export interface IFullEquipment {
  equipmentModel: IFullEquipmentModel
  equipmentModelId: string
  id: string
  name: string
  position: TMarker
}
