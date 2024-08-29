type Position = {date: string, lat: number, lon: number}

export interface EquipmentPositionHistory{
    equipmentId: string;
    positions: Position[]
}