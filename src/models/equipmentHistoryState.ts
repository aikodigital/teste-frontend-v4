export interface EquipmentHistoryState {
    equipmentId: string;
    states: {
        date: string;
        equipmentStateId: string;
    }[]
}