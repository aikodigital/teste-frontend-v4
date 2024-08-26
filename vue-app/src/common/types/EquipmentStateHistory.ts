export type State = {
    date: string,
    equipmentStateId: string
}

type EquipmentStateHistory = {
    equipmentId: string,
    states: State[]
}

export default EquipmentStateHistory;