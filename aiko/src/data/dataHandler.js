import equipmentJSON from './equipment.json';
import equipmentModelJSON from './equipmentModel.json';
import equipmentPositionHistoryJSON from './equipmentPositionHistory.json';
import equipmentStateJSON from './equipmentState.json';
import equipmentStateHistoryJSON from './equipmentStateHistory.json';

function getLastState(equipmentId) {
    const stateHistory = equipmentStateHistoryJSON.find(stateHis => stateHis.equipmentId === equipmentId)?.states || [];
    if (stateHistory.length === 0) return null;

    stateHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    const lastState = equipmentStateJSON.find(state => state.id === stateHistory[0].equipmentStateId);
    return lastState ? { name: lastState.name, color: lastState.color } : null;
}

function getLastPosition(equipmentId) {
    const positionHistory = equipmentPositionHistoryJSON.find(posHis => posHis.equipmentId === equipmentId)?.positions || [];
    if (positionHistory.length === 0) return null;

    positionHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    return positionHistory[0];
}

function mapStateHistory(stateHistory) {
    return stateHistory.map(state => {
        const stateDetails = equipmentStateJSON.find(s => s.id === state.equipmentStateId);
        return {
            ...state,
            stateName: stateDetails ? stateDetails.name : 'Unknown',
            stateColor: stateDetails ? stateDetails.color : 'Unknown',
        };
    });
}

function processEquipmentData() {
    return equipmentJSON.map(equip => ({
        id: equip.id,
        model: equipmentModelJSON.find(model => model.id === equip.equipmentModelId),
        name: equip.name,
        lastState: getLastState(equip.id),
        lastPosition: getLastPosition(equip.id),
        stateHistory: mapStateHistory(equipmentStateHistoryJSON.find(stateHis => stateHis.equipmentId === equip.id)?.states || []),
        positionHistory: equipmentPositionHistoryJSON.find(posHis => posHis.equipmentId === equip.id)?.positions || [],
    }));
}

function data() {
    const equipment = processEquipmentData();
    return equipment;
}


export default data;
