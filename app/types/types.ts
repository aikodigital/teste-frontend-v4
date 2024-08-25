export interface Equipment {
    id: string;
    equipmentModelId: string;
    name: string;
}

export interface EquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: {
        equipmentStateId: string;
        value: number;
    }[];
}

export interface Position {
    date: string;
    lat: number;
    lon: number;
}

export interface EquipmentPositionHistory {
    equipmentId: string;
    positions: Position[];
}

export interface EquipmentState {
    id: string;
    name: string;
}

export interface EquipmentStateHistory {
    equipmentId: string;
    stateId: string;
    date: string;
}
