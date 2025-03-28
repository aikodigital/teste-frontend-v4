export interface IEquipaments {
  id: string,
  name: string,
  equipmentModelId: string
}


export interface IEquipamentsModel {
  id: string,
  name: string,
  hourlyEarnings: {
    equipmentStateId: string,
    value: string
  }[]
}

export interface IEquipamentsPositionHistory {
  equipmentId: string,
  positions: {
    date: string,
    lat: number,
    lon: number
  }[]
}

export interface IEquipamentsState {
  id:string,
  name:string,
  color:string
}

export interface IEquipamentsStateHistory {
  equipmentId:string,
  states: {
    date:string,
    equipmentStateId:string
  }[]
}


