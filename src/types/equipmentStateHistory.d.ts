type State = {date: string, equipmentStateId: string}

export interface EquipmentStateHistory{
    equipmentId: string;
    states: State[]
}