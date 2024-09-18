
export interface EquipmentModelProps {
  id: string
  name: string
  hourlyEarnings: {
    equipmentStateId: string
    value: number
  }[]
}

export interface EquipmentProps {
  id: string
  equipmentModelId: string
  name: string
}

export interface EquipmentStateProps {
  id: string
  name: string
  color: string
}

export interface EquipmentStatesProps {
  date: string
  equipmentStateId: string
  state?: EquipmentStateProps[]
  equipment?: EquipmentProps
}


export interface EquipmentStateHistoryProps {
  equipmentId: string
  states: EquipmentStatesProps[]
  equipment?: EquipmentProps
}


export interface EquipmentPositionProps {
  date: string
  lat: number
  lon: number
}

export interface EquipmentPositionHistoryProps {
  equipmentId: string
  equipment?: EquipmentProps
  positions: EquipmentPositionProps[]
}
