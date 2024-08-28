export const selectEquipmentStateHistory = (id) => (state) => {
    const equipmentStateHistory = state.equipmentStateHistory.data;
    const equipmentStates = state.equipmentState.data;
    const equipments = state.equipment.data;
    const equipmentPositionHistory = state.equipmentPositionHistory.data;

    const equipmentPositions = equipmentPositionHistory.find((e) => e.equipmentId === id)
    const equipmentHistory = equipmentStateHistory.find((equipment) => equipment.equipmentId === id);
    const equipmentData = equipments.find((equipment) => equipment.id === id);

    equipmentHistory
    if (equipmentHistory) {
        return equipmentHistory.states.map((state) => {
            const stateDetails = equipmentStates.find((s) => s.id === state.equipmentStateId);
            const positionDetails = equipmentPositions.positions.find((position) => position.date === state.date)

            return {
                equipmentId: id,
                equipmentModelId: equipmentData.equipmentModelId,
                date: state.date,
                ...positionDetails,
                stateId: state.equipmentStateId || '000000',
                stateName: stateDetails?.name || 'Desconhecido',
                stateColor: stateDetails?.color || 'cinza',
            };
        });
    }

}