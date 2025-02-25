export type Position = {
  date: string,
  lat: number,
  lon: number
}

export interface EquipmentPositionHistory {
  equipmentId: string,
  positions: Array<Position>
}

export type EquipmentsPositionHistory = Array<EquipmentPositionHistory>