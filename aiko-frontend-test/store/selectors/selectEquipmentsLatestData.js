export const selectEquipmentsLatestData = (state) => {
    const equipmentPositionHistory = state.equipmentPositionHistory.data;
    const equipmentStateHistory = state.equipmentStateHistory.data;
    const equipmentStates = state.equipmentState.data;
    const equipments = state.equipment.data;

    if (Array.isArray(equipmentPositionHistory) && Array.isArray(equipmentStateHistory)) {
        const combinedData = equipmentPositionHistory.map((equipmentPosition) => {
            const matchingStateHistory = equipmentStateHistory.find((state) => state.equipmentId === equipmentPosition.equipmentId);

            const latestPosition = equipmentPosition.positions[equipmentPosition.positions.length - 1];

            const latestState = matchingStateHistory.states
                .filter((state) => new Date(state.date) <= new Date(latestPosition.date))
                .reduce((latest, state) => {
                    return new Date(state.date) > new Date(latest.date) ? state : latest;
                }, { date: '1970-01-01T00:00:00Z' });

            const stateDetails = equipmentStates.find((s) => s.id === latestState.equipmentStateId);
            const equipment = equipments.find((e) => e.id === equipmentPosition.equipmentId);

            return {
                equipmentId: equipmentPosition.equipmentId,
                equipmentModelId: equipment ? equipment.equipmentModelId : 'Unknown',
                date: latestPosition.date,
                lat: latestPosition.lat,
                lon: latestPosition.lon,
                stateId: stateDetails ? stateDetails.id : 'Unknown',
                stateName: stateDetails ? stateDetails.name : 'Unknown',
                stateColor: stateDetails ? stateDetails.color : 'Unknown'
            };
        });

        return combinedData.filter(item => item !== null);
    }

    return [];
};
