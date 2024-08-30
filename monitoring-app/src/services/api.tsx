export const fetchData = async () => {
    const equipmentResponse = await fetch('/data/equipment.json');
    const equipment = await equipmentResponse.json();

    const positionResponse = await fetch('/data/equipmentPositionHistory.json');
    const positions = await positionResponse.json();

    const stateResponse = await fetch('/data/equipmentState.json');
    const states = await stateResponse.json();

    const stateHistoryResponse = await fetch('/data/equipmentStateHistory.json');
    const stateHistory = await stateHistoryResponse.json();

    return { equipment, positions, states, stateHistory };
};