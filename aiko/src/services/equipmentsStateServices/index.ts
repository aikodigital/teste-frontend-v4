import equipmentState from "../../../data/equipmentState.json"

export default function equipmentsStateServices() {
    function getEquipmentsState() {
        return equipmentState
    }

    return {
        getEquipmentsState,
    }
}