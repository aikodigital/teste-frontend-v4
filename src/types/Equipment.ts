export type MapViewProps = {
  equipmentList: Equipment[]
  onMarkerClick: (equipment: Equipment) => void
}

export type Equipment = {
  id: string
  name: string
  position?: {
    lat: number
    lng: number
  }
  state?: string
}

export type EquipmentMarkerProps = {
  equipment: Equipment
  onClick: () => void
}

export type EquipmentState = {
  id: string
  name: string
  color: string
}

export type EquipmentModel = {
  id: string
  name: string
  hourlyEarnings: {
    equipmentStateId: string
    value: number
  }[]
}

export type EquipmentDetailsProps = {
  equipmentId: string
}

export type EquipmentStateHistoryProps = {
  equipmentId: string
  onClose: () => void
}

export type StateHistoryEntry = {
  id: string
  timestamp: string
  state: string
  color: string
}
