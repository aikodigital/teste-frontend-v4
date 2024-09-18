export interface IEquipment {
    id: string;
    name: string;
    equipmentModelId: string;
    modelName: string,
    hourlyEarnings: {
        equipmentStateId: string;
        value: number;
    }[],
    state: {
        id: string;
        name: string;
        color: string;
    }
}