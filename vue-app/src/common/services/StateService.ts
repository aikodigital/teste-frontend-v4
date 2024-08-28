import states from '@/assets/data/equipmentState.json'
import equipmentStateHistory from '@/assets/data/equipmentStateHistory.json'
import EquipmentState from '../types/EquipmentState';
import EquipmentStateHistory, { State } from '../types/EquipmentStateHistory';

export function listStates(): EquipmentState[] {
    return states;
}

export function getStateById(id: string): EquipmentState | undefined {
    return states.find(state => state.id === id);
}

export function getEquipmentHistoryStates(id: string): EquipmentStateHistory | undefined {
    return equipmentStateHistory.find(p => p.equipmentId === id);
}

export function getEquipmentLastState(id: string): State | undefined {
    const equipmentHistoryState = getEquipmentHistoryStates(id);
    return equipmentHistoryState ? 
    equipmentHistoryState.states[equipmentHistoryState.states.length - 1] : undefined;
}

export default {
    listStates,
    getStateById,
    getEquipmentHistoryStates,
    getEquipmentLastState
}