import equipmentState from "../../../data/equipmentState.json"

export default function equipmentsStateServices() {
    function getEquipmentsState() {
        return equipmentState
    }

    function getEquipmentsStateById(statusId: string) {
        return equipmentState.find(st => st.id === statusId)
    }

    return {
        getEquipmentsState,
        getEquipmentsStateById,
    }
}