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
    name: string;
    lat: any;
    lon: any;
    state: string;
    color: string;
    stateHistory: {
        date: string;
        state: string;
    }[];
}
