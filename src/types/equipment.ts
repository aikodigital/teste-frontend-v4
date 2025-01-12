import type { EquipmentModel } from './equipmentModel'

export type Equipment = {
  id: string
  equipmentModelId: EquipmentModel['id']
  name: string
}

export type Period = 'day' | 'month' | 'year'
