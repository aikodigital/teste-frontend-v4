import states from '@/assets/data/equipmentState.json'
import equipmentStateHistory from '@/assets/data/equipmentStateHistory.json'
import EquipmentState from '../types/EquipmentState';
import EquipmentStateHistory, { State } from '../types/EquipmentStateHistory';
import { ResultAllProductionDays, ResultDailyProductivy } from '../types/EquipmentProduction';
import { getModelById } from './ModelService';

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

export function calcHoursEachState(dados: State[]) {
    const result = {} as ResultAllProductionDays;

    for (let i = 0; i < dados.length - 1; i++) {
        const current = dados[i];
        const next = dados[i + 1];

        const currentDate = new Date(current.date);
        const nextDate = new Date(next.date);

        let horas = nextDate.getHours() - currentDate.getHours();
        if(currentDate.getDate() !== nextDate.getDate())
            horas = 0;
        
        const dia = currentDate.toISOString().split('T')[0];

        if (!result[dia]) {
            result[dia] = {};
        }

        if (!result[dia][current.equipmentStateId]) {
            result[dia][current.equipmentStateId] = 0;
        }

        result[dia][current.equipmentStateId] += horas;
    }

    console.log(result)
    return result;
}

export function calcDailyProductivy(result: ResultDailyProductivy){
    const operandoState = listStates().find(p => p.name === 'Operando');
    const hours = result[operandoState!.id];
    if(!hours) return 0;
    return (hours / 24) * 100;
}

export function calcDailyEarning(result: ResultDailyProductivy, equipmentModelId: string){

    const model = getModelById(equipmentModelId);

    let sum = 0;
    Object.keys(result).forEach(stateId => {
        const hourlyEarnings = model?.hourlyEarnings.find(p => p.equipmentStateId === stateId)?.value ?? 0;
        const hours = result[stateId];
        sum += hourlyEarnings * hours;
    })

    return sum;
}

export default {
    listStates,
    getStateById,
    getEquipmentHistoryStates,
    getEquipmentLastState
}