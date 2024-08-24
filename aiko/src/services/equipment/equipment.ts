import equipment from "../../../data/equipment.json"
import equipmentState from "../../../data/equipmentState.json"
import equipmentModel from "../../../data/equipmentModel.json"
import equipmentStateHistory from "../../../data/equipmentStateHistory.json"
import equipmentPositionHistory from "../../../data/equipmentPositionHistory.json"

export default function equipmentServices() {
    function getEquipments() {
        return equipment
    }
    function getEquipmentsModel() {
        return equipmentModel
    }
    function getEquipmentsPositionHistory() {
        return equipmentPositionHistory
    }
    function getEquipmentsState() {
        return equipmentState
    }
    function getEquipmentsStateHistory() {
        return equipmentStateHistory
    }

    return {
        getEquipments,
        getEquipmentsModel,
        getEquipmentsPositionHistory,
        getEquipmentsState,
        getEquipmentsStateHistory,
    }
}