export interface IPositionHistory {
    equipmentId: string;
    positions: IPositionHistoryPosition[];
}

export interface IPositionHistoryPosition {
    date: string;
    lat: number;
    lon: number;
}