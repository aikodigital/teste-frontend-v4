export interface EquipmentsPositionHistoryProps {
  equipmentId: string
  positions: EquipmentPositionProps[]
}

export interface EquipmentPositionProps {
  date: string
  lat: number
  lon: number
}