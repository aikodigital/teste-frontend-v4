type Position = {
    date: string,
    lat: number,
    lon: number
}

type EquipmentPositionHistory = {
    equipmentId: string,
    positions: Position[]
}

export default EquipmentPositionHistory;

