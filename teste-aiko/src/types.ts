export interface Equipment {
    id: string;
    name: string;
    equipmentModelId: string;
}

export interface EquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: {
        equipmentStateId: string;
        value: number;
    }[];
}

export interface EquipmentStateHistory {
    equipmentId: string;
    states: StateHistory[];
}

export interface StateHistory {
    equipmentStateId: string;
    date: string; // ISO string format
}

export interface EquipmentState {
    id: string;
    name: string;
}

export interface EquipmentPositionHistory {
    equipmentId: string;
    positions: {
        date: String;
        lat: String;
        log: String;
    }
}