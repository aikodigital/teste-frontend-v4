export type TPosition = {
  date: string
  lat: number
  lon: number
}

export interface IEquipmentPositionHistory {
  equipmentId: string
  positions: TPosition[]
}

export interface IEquipmentLastPositionHistory {
  equipmentId: string
  position: {
    lat: number
    lon: number
  }
}
