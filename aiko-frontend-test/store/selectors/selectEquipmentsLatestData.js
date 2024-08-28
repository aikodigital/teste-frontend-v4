export const selectEquipmentsLatestData = (state) => {
    const equipmentPositionHistory = state.equipmentPositionHistory.data;
    const equipmentStateHistory = state.equipmentStateHistory.data;
    const equipmentStates = state.equipmentState.data;
    const equipments = state.equipment.data;

    if (Array.isArray(equipmentPositionHistory) && Array.isArray(equipmentStateHistory)) {

        const combinedData = equipmentPositionHistory.map((equipmentPosition) => {
            const matchingStateHistory = equipmentStateHistory.find((state) => state.equipmentId === equipmentPosition.equipmentId);


            const latestCombinedData = equipmentPosition.positions.reduce((latest, position) => {
                const matchingState = matchingStateHistory.states.find((state) => state.date === position.date);

                if (matchingState && new Date(position.date) > new Date(latest.date)) {
                    const stateDetails = equipmentStates.find((s) => s.id === matchingState.equipmentStateId);
                    const equipment = equipments.find((e) => e.id === equipmentPosition.equipmentId);

                    return {
                        equipmentId: equipmentPosition.equipmentId,
                        equipmentModelId: equipment ? equipment.equipmentModelId : 'Unknown',
                        date: position.date,
                        lat: position.lat,
                        lon: position.lon,
                        stateId: stateDetails ? stateDetails.id : 'Unknown',
                        stateName: stateDetails ? stateDetails.name : 'Unknown',
                        stateColor: stateDetails ? stateDetails.color : 'Unknown'
                    };
                }
                return latest;
            }, { date: '1970-01-01T00:00:00Z' });

            return latestCombinedData;
        });

        return combinedData.filter(item => item !== null);
    }

    return [];
};
