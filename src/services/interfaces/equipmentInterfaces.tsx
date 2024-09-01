export interface EquipmentStateHistory {
    equipmentId: string;
    states: {
        date: string;
        equipmentStateId: string;
    }[];
}

export interface EquipmentState {
    id: string;
    name: string;
    color: string;
}

export interface mapEquipmentDataInterface {
    id: string;
    tag: string;
    productivity: string;
    earnings: number;
    name: string;
    icon: string;
    lat: number;
    lon: number;
    state: string;
    color: string;
    stateHistory: {
        date: string;
        state: string;
    }[];
}
