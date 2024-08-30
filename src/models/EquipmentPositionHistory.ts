export interface IEquipmentPositionHistory {
    equipmentId: string,
    positions: IPosition[],
}

export interface IPosition {
    equipmentId?: string
    date: string,
    lat: number,
    lon: number
}