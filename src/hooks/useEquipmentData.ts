import { useState, useEffect } from 'react';
import { 
    Equipment, 
    EquipmentModel, 
    EquipmentState, 
    StateHistoryItem,
    PositionHistoryItem
} from "../types/equipment";
import { 
    generateEquipmentNames, 
    processHistoryData
} from "../utils/equipmentUtils";

export function useEquipmentData() {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [equipmentModels, setEquipmentModels] = useState<EquipmentModel[]>([]);
    const [equipmentStates, setEquipmentStates] = useState<EquipmentState[]>([]);
    const [stateHistory, setStateHistory] = useState<Record<string, StateHistoryItem[]>>({});
    const [positionHistory, setPositionHistory] = useState<Record<string, PositionHistoryItem[]>>({});
    const [equipmentNames, setEquipmentNames] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAllData = async () => {
            try {
                const [
                    equipmentData,
                    modelsData,
                    statesData,
                    stateHistoryData,
                    positionHistoryData
                ] = await Promise.all([
                    fetch('/data/equipment.json').then(res => res.json()),
                    fetch('/data/equipmentModel.json').then(res => res.json()),
                    fetch('/data/equipmentState.json').then(res => res.json()),
                    fetch('/data/equipmentStateHistory.json').then(res => res.json()),
                    fetch('/data/equipmentPositionHistory.json').then(res => res.json())
                ]);

                setEquipment(equipmentData);
                setEquipmentModels(modelsData);
                setEquipmentStates(statesData);
                
                // Generate friendly names for equipment
                const names = generateEquipmentNames(equipmentData, modelsData);
                setEquipmentNames(names);
                
                // Process history data
                const stateHistoryRecord = processHistoryData(stateHistoryData, 'states');
                setStateHistory(stateHistoryRecord);

                const positionHistoryRecord = processHistoryData(positionHistoryData, 'positions');
                setPositionHistory(positionHistoryRecord);

            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load equipment data';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        loadAllData();
    }, []);

    return {
        equipment,
        equipmentModels,
        equipmentStates,
        stateHistory,
        positionHistory,
        equipmentNames,
        loading,
        error
    };
}