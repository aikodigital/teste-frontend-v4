export interface Equipment {
    id: string
    name: string
    equipmentModelId: string
  }
  
  export interface EquipmentModel {
    id: string
    name: string
  }
  
  export interface Position {
    date: string
    lat: number
    lon: number
  }
  
  export interface EquipmentPositionHistory {
    equipmentId: string
    positions: Position[]
  }
  
  export interface EquipmentWithLatestPosition extends Equipment {
    position: Position
    modelName: string
  }
  
  export interface EquipmentState {
    id: string
    name: string
    color: string
  }
  
  export interface EquipmentStateHistory {
    equipmentId: string
    states: {
      date: string
      equipmentStateId: string
    }[]
  }
  
  