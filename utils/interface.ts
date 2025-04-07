export interface Position {
    lat: number;
    lon: number;
    date: Date | string;
}

export interface StateHistory {
    name: string;
    color: string;
    date: Date | string;
}

export interface EquipmentType {
    id: string;
    name: string;
    model: string;
    productivity?: number;
    revenue?: number;
    state?: { name: string; color: string };
    positionHistory: Position[];
    stateHistory: StateHistory[];
}

export interface EquipmentSidebarProps {
    equipment: EquipmentType;
    onClose: () => void;
}