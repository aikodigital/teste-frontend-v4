import { StateHistoryItem, PositionHistoryItem } from '../types/equipment';

export function getEquipmentStateAtDate(
    stateHistory: Record<string, StateHistoryItem[]>,
    equipmentId: string, 
    date: Date
): string | undefined {
    const states = stateHistory[equipmentId] || [];
    if (states.length === 0) return undefined;
    
    const timestamp = date.getTime();
    let closestState = undefined;
    let closestTime = -Infinity;
    
    for (const state of states) {
        const stateTime = new Date(state.date).getTime();
        if (stateTime <= timestamp && stateTime > closestTime) {
            closestTime = stateTime;
            closestState = state.equipmentStateId;
        }
    }
    
    return closestState;
}

export function getEquipmentPositionAtDate(
    positionHistory: Record<string, PositionHistoryItem[]>,
    equipmentId: string, 
    date: Date
): [number, number] | null {
    const positions = positionHistory[equipmentId] || [];
    if (positions.length === 0) return null;
    
    const timestamp = date.getTime();
    let closestPosition: [number, number] | null = null;
    let closestTime = -Infinity;
    
    for (const position of positions) {
        const posTime = new Date(position.date).getTime();
        if (posTime <= timestamp && posTime > closestTime) {
            closestTime = posTime;
            closestPosition = [position.lat, position.lon];
        }
    }
    
    return closestPosition;
}