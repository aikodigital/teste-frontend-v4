import equipmentStateHistory from "../../../data/equipmentStateHistory.json"

export default function equipmentsStateHistoryServices() {
    function getEquipmentsStateHistory() {
        return equipmentStateHistory
    }

    function getEquipmentsStateHistoryById(equipmentId: string) {
        return equipmentStateHistory.find(eq => eq.equipmentId === equipmentId)
    }

    return {
        getEquipmentsStateHistory,
        getEquipmentsStateHistoryById,
    }
}