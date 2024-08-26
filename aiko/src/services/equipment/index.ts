import equipment from "../../../data/equipment.json"

export default function equipmentServices() {
    function getEquipments() {
        return equipment
    }

    function getEquipmentsById(equipmentId: string) {
        return equipment.find(eq => eq.id === equipmentId)
    }

    return {
        getEquipments,
        getEquipmentsById
    }
}