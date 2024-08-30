export interface EquipmentPositionHistory {
    equipmentId: string,
    positions: Position[],
}

export interface Position {
    date: string,
    lat: number,
    lon: number
}