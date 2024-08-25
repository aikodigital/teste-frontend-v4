import equipmentState from "../../../data/equipmentState.json"

export default function equipmentsStateServices() {
    function getEquipmentsState() {
        return equipmentState
    }

    function getEquipmentsStateById(statusId: string) {
        return getEquipmentsState().filter(st => st.id === statusId)[0]
    }

    return {
        getEquipmentsState,
        getEquipmentsStateById,
    }
}