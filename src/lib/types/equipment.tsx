type EquipmentModel = {
    id: string;
    name: string;
}

type Position = {
    date: Date;
    lat: number;
    lon: number;
}

export type EquipmentState = {
    id: string;
    name: string;
    color: string;
    date?: Date;
}

export type Equipment = {
    id: string;
    name: string;
    model: EquipmentModel;
    currentPosition: Position;
    positionHistory: Position[];
    currentState: EquipmentState;
    stateHistory: EquipmentState[];
}