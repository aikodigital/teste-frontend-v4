export interface IEquipament {
    id: string;
    equipmentModelId: string;
    name: string;
}

export interface IEquipmentState {
    id: string;
    name: string;
    color: string;
}

export interface IEquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: {
        equipmentStateId: string;
        value: number;
    }[];
}

export interface IEquipamentPositionHistory {
    equipmentId: string;
    positions: {
        date: string;
        lat: number;
        lon: number;
    }[];
}

export interface IEquipmentStateHistory {
    equipmentId: string;
    states: {
        date: string;
        equipmentStateId: string;
    }[]
}

export interface IListEquipments {
    id: string;
    name: string;
    model: string | undefined;
    lastStateDate: string | undefined;
    stateCurrent: string | undefined;
    stateColor: string | undefined;
    productivity: string;
    positionHistory: {
        date: string;
        state: string;
        color: string;
        lat: number;
        lon: number;
    }[];
    positionCurrent: {
        lat: number;
        lon: number;
    };  
}
