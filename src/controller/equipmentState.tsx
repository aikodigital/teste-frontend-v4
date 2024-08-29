import { IState } from "@/interface/state";
import equipmentState from '../data/equipmentState.json';

export async function getState(equipmentStateId: string) {
    let response: IState = {} as IState;
    
    await Promise.all(equipmentState.map(state => {
        if (state.id == equipmentStateId) {
            response = state
        }
    }))

    return response;
}