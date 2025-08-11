type Equipment = {
    id: string,
    equipmentModelId: string,
    name: string
};

type EquipmentModel = {
    id: string,
    name: string,
    hourlyEarnings: Array<{
        equipmentStateId: string,
        value: number
    }>
};

type EquipmentPositionHistory = {
    equipmentId: string,
    positions: Array<{
        date: Date,
        lat: number,
        lon: number
    }>
};

type EquipmentState = {
    id: string,
    name: string,
    color: string
};

type EquipmentStateHistory = {
    equipmentId: string,
    states: Array<{
        date: Date,
        stateId: string
    }>
};

export type { Equipment, EquipmentModel, EquipmentPositionHistory, EquipmentState, EquipmentStateHistory };