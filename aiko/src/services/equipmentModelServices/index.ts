import equipmentModel from "../../../data/equipmentModel.json"

export default function equipmentModelServices() {
    function getEquipmentsModel() {
        return equipmentModel
    }

    function getEquipmentsModelById(equipmentModelId: string) {
        return equipmentModel.find(eq => eq.id === equipmentModelId)
    }

    return {
        getEquipmentsModel,
        getEquipmentsModelById,
    }
}