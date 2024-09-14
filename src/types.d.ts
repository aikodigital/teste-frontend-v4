export interface Position {
    date: string;
    lat: number;
    lon: number;
} // ok

export interface EquipmentPosition {
    equipmentId: string;
    positions: Position[];
} // ok

export interface EquipmentState {
    date: string;
    equipmentStateId: string;
}

export interface EquipmentStateHistory {
    equipmentId: string;
    states: EquipmentState[];
}

export interface EquipmentStateInfo {
    id: string;
    name: string;
    color: string;
}

export interface Equipment {
    id: string;
    equipmentModelId: string;
    name: string;
} // ok

export interface EquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: {
        equipmentStateId: string;
        value: number;
    }[];
} // ok

export interface MapComponentProps {
    equipmentPositions: EquipmentPosition[];
    equipmentStates: EquipmentStateHistory[];
    stateInfoList: EquipmentStateInfo[];
    selectedEquipment?: string | null;
}

export interface CardListProps {
    equipmentList: Equipment[];
    equipmentModelList: EquipmentModel[];
    stateInfoList: EquipmentStateInfo[];
    onCardClick: (id: string) => void;
}