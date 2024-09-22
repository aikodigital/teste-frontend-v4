interface Equipment {
    id: string;
    equipmentModelId: string;
    name: string;
}

interface EquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: HourlyEarning[]
}

interface HourlyEarning {
    equipmentStateId: string;
    value: number;
}

interface EquipmentPositionHistory {
    equipmentId: string;
    positions: Position[];
}

interface Position {
    date: string;
    lat: number;
    lon: number;
}

interface EquipmentState {
    id: string;
    name: string;
    color: string;
}

interface EquipmentStateHistory {
    equipmentId: string;
    states: State[] | [];
}

interface State {
    date: string;
    equipmentStateId: string;
}

interface LatestEquipmentInfo {
    equipmentId: string;
    equipmentName: string;
    equipmentModelId: string;
    equipmentModelName: string;
    currentStateId: string;
    currentStateName: string;
    color: string;
    date: string;
    lat: number;
    lon: number;
    value: number;
}

interface StateHistoryData {
    equipmentId?: string;
    equipmentName?: string;
    equipmentModelId?: string;
    equipmentModelName?: string;
    productivity?: number;
    lastState?: string;
    states?: StateData[] | [];
}

interface StateData {
    date?: string;
    equipmentStateId?: string;
    equipmentStateName?: string;
}

interface PositionHistory {
    equipmentStateId: string | undefined;
    color: string | undefined;
    currentStateName: string | undefined;
    date: string;
    lat: number;
    lon: number;
}

export type { 
    Equipment,
    EquipmentModel,
    EquipmentPositionHistory,
    Position,
    EquipmentState,
    EquipmentStateHistory,
    State,
    StateData,

    LatestEquipmentInfo,
    StateHistoryData,
    PositionHistory
 }