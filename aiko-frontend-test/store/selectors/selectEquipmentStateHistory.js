export const selectEquipmentStateHistory = (id) => (state) => {
    const equipmentStateHistory = state.equipmentStateHistory.data;
    const equipmentStates = state.equipmentState.data;
    const equipments = state.equipment.data;
    const equipmentPositionHistory = state.equipmentPositionHistory.data;

    const equipmentPositions = equipmentPositionHistory.find((e) => e.equipmentId === id);
    const equipmentHistory = equipmentStateHistory.find((equipment) => equipment.equipmentId === id);
    const equipmentData = equipments.find((equipment) => equipment.id === id);

    if (!equipmentPositions || !equipmentHistory) return [];

    let lastValidState = null;

    return equipmentPositions.positions.map((position) => {
        const matchingState = equipmentHistory.states
            .filter((state) => new Date(state.date) <= new Date(position.date))
            .reduce((latest, state) => {
                if (!latest || new Date(state.date) > new Date(latest.date)) {
                    return state;
                }
                return latest;
            }, lastValidState);

        if (matchingState) {
            lastValidState = matchingState;
        }

        const stateToUse = lastValidState || { equipmentStateId: '000000' };
        const stateDetails = equipmentStates.find((s) => s.id === stateToUse.equipmentStateId);

        return {
            equipmentId: id,
            equipmentModelId: equipmentData?.equipmentModelId || 'Unknown',
            date: position.date,
            lat: position.lat,
            lon: position.lon,
            stateId: stateToUse.equipmentStateId,
            stateName: stateDetails?.name || 'Desconhecido',
            stateColor: stateDetails?.color || 'Cinza',
        };
    });
};
