import equipmentStateHistory from "../../../data/equipmentStateHistory.json"

export default function equipmentsStateHistoryServices() {
    function getEquipmentsStateHistory() {
        return equipmentStateHistory
    }

    return {
        getEquipmentsStateHistory,
    }
}