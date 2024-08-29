import { IState, IStateHistoryState } from '@/interface/state';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import { getState } from './equipmentState';


export async function listStateHistory(equipmentId: string) {
    let response: IStateHistoryState[] = [];
    await Promise.all(equipmentStateHistoryData.map(history => {
        if (history.equipmentId == equipmentId) {
            response = history.states
        }
    }))

    return response;
}

export async function getLastStateHistory(equipmentId: string) {
    let response: IState = {} as IState;
    const stateHistory = await listStateHistory(equipmentId)
    await Promise.all(stateHistory.map(async (history, i, row) => {
        if (i + 1 === row.length) {
            const lastState = await getState(history.equipmentStateId)
            response = lastState
        }
    }))

    return response;
}

export async function listStateHistoryState(equipmentId: string) {
    let response: IStateHistoryState[] = [];
    await Promise.all(equipmentStateHistoryData.map(async (history, i, row) => {
        if (history.equipmentId == equipmentId) {
            await Promise.all(history.states.map(async (states) => {
                const state = await getState(states.equipmentStateId)
                
                response.push({
                    ...states,
                    state
                })
            }))
        }
    }))

    return response.reverse();
}