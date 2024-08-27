
export const selectEquipmentsLatestData = (state) => {
    const equipmentPositionHistory = state.equipmentPositionHistory.data;
    const equipmentStateHistory = state.equipmentStateHistory.data;
    const equipmentStates = state.equipmentState.data;
    const equipments = state.equipment.data

    if (Array.isArray(equipmentPositionHistory) && Array.isArray(equipmentStateHistory)) {

        const latestPositions = equipmentPositionHistory.map((equipmentPosition) => {
            const latestPosition = equipmentPosition.positions.reduce((latest, position) => {
                return new Date(position.date) > new Date(latest.date) ? position : latest;
            }, equipmentPosition.positions[0]);

            return {
                equipmentId: equipmentPosition.equipmentId,
                ...latestPosition
            };
        });


        const latestStates = equipmentStateHistory.map((equipmentState) => {
            const latestState = equipmentState.states.reduce((latest, state) => {
                return new Date(state.date) > new Date(latest.date) ? state : latest;
            }, equipmentState.states[0]);

            return {
                equipmentId: equipmentState.equipmentId,
                ...latestState
            };
        });


        const combinedData = latestPositions.map((position) => {
            const stateData = latestStates.find((state) => state.equipmentId === position.equipmentId);
            const state = equipmentStates.find((s) => s.id === stateData.equipmentStateId);
            const equipment = equipments.find((e) => e.id === stateData.equipmentId)
            return {
                equipmentId: position.equipmentId,
                equipmentModelId: equipment.equipmentModelId,
                date: position.date,
                lat: position.lat,
                lon: position.lon,
                stateId: state ? state.id : 'Unknown',
                stateName: state ? state.name : 'Unknown',
                stateColor: state ? state.color : 'Unknown'
            };
        });

        return combinedData;
    }

    return [];
};
