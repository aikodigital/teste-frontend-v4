import equipment from "../../../data/equipment.json"

export default function equipmentServices() {
    function getEquipments() {
        return equipment
    }

    return {
        getEquipments,
    }
}