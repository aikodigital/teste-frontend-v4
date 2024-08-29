export interface Equipment {
  id: string
  equipmentModelId: string
  name: string
}

export interface EquipmentStatus {
  id: string
  name: string
  color: string
}

export interface Position {
  date: string
  lat: number
  lon: number
}

export interface EquipmentPosition {
  equipmentId: string
  positions: Array<Position>
}
