export const selectEquipmentStateHistory = (id) => (state) => {
    const equipmentStateHistory = state.equipmentStateHistory.data;
    const equipmentStates = state.equipmentState.data;


    const equipmentHistory = equipmentStateHistory.find((equipment) => equipment.equipmentId === id);


    if (equipmentHistory) {
        return equipmentHistory.states.map((state) => {
            const stateDetails = equipmentStates.find((s) => s.id === state.equipmentStateId);
            return {
                equipmentId: id,
                ...state,
                stateName: stateDetails?.name || 'Desconhecido',
                stateColor: stateDetails?.color || 'cinza',
            };
        });
    }

}