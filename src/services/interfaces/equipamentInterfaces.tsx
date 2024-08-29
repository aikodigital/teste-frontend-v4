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