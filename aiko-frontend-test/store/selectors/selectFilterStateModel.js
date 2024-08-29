export const selectFilterStateModel = (equipmentState, model) => (state) => {

    const equipmentLatestHistory = state.equipmentPositionHistory.equipmentLatestHistory;

    if (equipmentState || model) {
        const filteredEquipmentData = equipmentLatestHistory.filter(equipment => {
            if ((equipmentState) && (model)) {
                return equipment.stateId == equipmentState && equipment.equipmentModelId == model
            }
            if (equipmentState) {
                return equipment.stateId == equipmentState
            }
            return equipment.equipmentModelId == model
        })
        return filteredEquipmentData
    }
    return []

}