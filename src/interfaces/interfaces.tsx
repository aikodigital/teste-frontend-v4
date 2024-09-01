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

export interface MyContextType {
    selectedState: string | null;
    selectedModel: string | null;
    searchTag: string | null;
    setSelectedState: React.Dispatch<React.SetStateAction<string | null>>;
    setSelectedModel: React.Dispatch<React.SetStateAction<string | null>>;
    setSearchTag: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface MapEquipmentData {
    id: string;
    tag: string;
    productivity: string;
    earnings: number;
    name: string;
    icon: string;
    lat: number;
    lon: number;
    state: string;
    color: string;
    stateHistory: {
        date: string;
        state: string;
    }[];
}

export interface ContextData {
    selectedState: string | null;
    setSelectedState: (state: string | null) => void;
    selectedModel: string | null;
    setSelectedModel: (model: string | null) => void;
    searchTag: string | null;
    setSearchTag: (tag: string | null) => void;
}   

export type EquipmentModel = {
    id: string;
    name: string;
};

export interface Equipment {
    id: string;
    name: string;
    equipmentModelId: string;
}

export interface EquipmentState {
    id: string;
    name: string;
    color: string;
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

export interface StateHistory {
    date: string;
    equipmentStateId: string;
}

export interface EquipmentStateHistory {
    equipmentId: string;
    states: StateHistory[];
}
