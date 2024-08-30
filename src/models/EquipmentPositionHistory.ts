export interface IEquipmentPositionHistory {
    equipmentId: string,
    positions: IPosition[],
}

export interface IPosition {
    date: string,
    lat: number,
    lon: number
}