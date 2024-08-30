import equipmentPositionHistory from "../../../data/equipmentPositionHistory.json"

export default function equipmentsPositionHistoryServices() {
    function getEquipmentsPositionHistory() {
        return equipmentPositionHistory
    }

    return {
        getEquipmentsPositionHistory,
    }
}