export interface EquipmentPosition {
    equipmentId: string;
    lat: number;
    lon: number;
}

export interface EquipmentPositionHistory {
    equipmentId: string;
    positions: {
        lat: number;
        lon: number;
    }[];
}

export interface EquipmentStateHistory {
    equipmentId: string;
    states: {
        date: string;
        equipmentStateId: string; // Ajustado para corresponder ao JSON
    }[];
}