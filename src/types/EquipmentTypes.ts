export interface EquipmentData {
  id: string
  name: string
  model: {
    id: string
    name: string
    hourlyEarnings: {
      equipmentStateId: string
      value: number
    }[]
  }
  historyPositions: {
    equipmentId: string
    positions: {
      date: string
      lat: number
      lon: number
    }[]
  }
  historyState: {
    date: string
    equipmentStateId: string
    [key: string]: string
  }[]
  isLatestPosition: {
    date: string
    lat: number
    lon: number
  }
  isLatestState: {
    date: string
    equipmentStateId: string
    color: string
    [key: string]: string
  }
}
