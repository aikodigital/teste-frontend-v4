import equipmentStateHistoryData from '../../data/equipmentStateHistory.json'
import { getStateData } from './getStateData'

export function getEquipmentLatestState(equipmentId: string){
    const [stateHistory] = equipmentStateHistoryData.filter(history => history.equipmentId === equipmentId);

    const state = getStateData(stateHistory?.states[stateHistory.states.length-1].equipmentStateId);

    return state;
}