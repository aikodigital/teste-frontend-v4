import equipmentModel from "../../../data/equipmentModel.json"

export default function equipmentModelServices() {
    function getEquipmentsModel() {
        return equipmentModel
    }

    return {
        getEquipmentsModel,
    }
}