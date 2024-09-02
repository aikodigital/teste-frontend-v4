import { useMemo } from 'react';
import { useEquipment } from '../context/EquipmentContext';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentState from '../data/equipmentState.json';

export const useEnrichedStateHistory = () => {
    const { selectedEquipmentId } = useEquipment();

    const getEnrichedStateHistory = (equipmentId: string) => {
        const stateHistory = equipmentStateHistory.find(equipment => equipment.equipmentId === equipmentId);
        if (!stateHistory) return [];

        return stateHistory.states
            .slice()
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(state => {
                const correspondingState = equipmentState.find(e => e.id === state.equipmentStateId);
                return {
                    ...state,
                    stateName: correspondingState ? correspondingState.name : 'Estado Desconhecido',
                    stateColor: correspondingState ? correspondingState.color : '#000000',
                };
            });
    };

    const enrichedStateHistory = useMemo(() => {
        return selectedEquipmentId ? getEnrichedStateHistory(selectedEquipmentId) : [];
    }, [selectedEquipmentId]);

    return enrichedStateHistory;
};
