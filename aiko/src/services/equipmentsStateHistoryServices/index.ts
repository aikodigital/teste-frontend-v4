import equipmentStateHistory from "../../../data/equipmentStateHistory.json"

export default function equipmentsStateHistoryServices() {
    function getEquipmentsStateHistory() {
        return equipmentStateHistory
    }

    function getEquipmentsStateHistoryById(equipmentId: string) {
        return getEquipmentsStateHistory().filter(eq => eq.equipmentId === equipmentId)[0]
    }

    return {
        getEquipmentsStateHistory,
        getEquipmentsStateHistoryById,
    }
}