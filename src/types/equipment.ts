export interface Equipment {
    id: string;
    name: string;
    equipmentModelId: string;
}

export interface EquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: {
        equipmentStateId: string;
        value: number;
    }[];
}

export interface EquipmentState {
    id: string;
    name: string;
    color: string;
}

export interface StateHistory {
    date: string;
    equipmentStateId: string;
}

export interface Position {
    date: string;
    lat: number;
    lon: number;
}

// Add this to your existing types file

export type FilterOption = {
    id: string;
    label: string;
    active: boolean;
}

// Update the EquipmentContextType to include filter-related properties
export type EquipmentContextType = {
    equipment: Equipment[];
    equipmentModels: EquipmentModel[];
    equipmentStates: EquipmentState[];
    stateHistory: Record<string, StateHistoryItem[]>;
    positionHistory: Record<string, PositionHistoryItem[]>;
    equipmentNames: Record<string, string>;
    getEquipmentName: (equipmentId: string) => string;
    
    // Propriedades relacinads aos Filtros
    typeFilters: FilterOption[];
    stateFilters: FilterOption[];
    toggleTypeFilter: (id: string) => void;
    toggleStateFilter: (id: string) => void;
    filteredEquipment: Equipment[];

    // Propriedades relacionadas à data
    selectedDate: Date;
    updateSelectedDate: (date: Date) => void;
    getEquipmentStateAtDate: (equipmentId: string, date: Date) => string | undefined;
    getEquipmentPositionAtDate: (equipmentId: string, date: Date) => [number, number] | null;
    advanceTime: (hours: number) => void;
    jumpToTime: (timePoint: 'start' | 'end' | 'specific', specificDate?: Date) => void;

    // Propriedades relacionadas ao histórico
    selectedEquipmentId: string | null;
    openEquipmentHistory: (equipmentId: string) => void;
    closeEquipmentHistory: () => void;

    getEquipmentById: (equipmentId: string) => Equipment | undefined;

    loading: boolean;
    error: string | null;
}

export interface StateHistoryEntry {
    date: string;
    equipmentStateId: string;
}

export interface PositionHistoryEntry {
    date: string;
    lat: number;
    lon: number;
}

export interface StateHistoryRecord {
    [equipmentId: string]: StateHistoryEntry[];
}

export interface PositionHistoryRecord {
    [equipmentId: string]: PositionHistoryEntry[];
}

export interface StateHistoryItem {
    date: string;
    equipmentStateId: string;
}

export interface PositionHistoryItem {
    date: string;
    lat: number;
    lon: number;
}

export interface HistoryData {
    equipmentId: string;
    states: StateHistoryItem[];
}

export interface PositionData {
    equipmentId: string;
    positions: PositionHistoryItem[];
}

export interface EquipmentTableItem {
    id: string;
    name: string;
    type: string;
    state: string;
    stateColor: string;
}
