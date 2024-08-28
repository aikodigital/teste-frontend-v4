import { TMarker } from '@components/MainMap/Map'
import { IEquipmentState } from './equipmentState.interface'
import { EQUIPMENT_STATUS } from '@constants/states'

export type TFullHourlyEarnings = {
  equipmentStateId: keyof typeof EQUIPMENT_STATUS
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
  state: IEquipmentState
  equipmentModelId: string
  id: string
  name: string
  position: TMarker
}
