// src/hooks/useEquipmentData.ts
import { useMemo } from 'react';
import { parseISO, compareDesc } from 'date-fns';

// Importar tipos
import {
    Equipment,
    EquipmentModel,
    EquipmentState,
    EquipmentStateHistory,
    EquipmentPositionHistory,
    EquipmentData,
    ProcessedEquipmentStateHistoryEntry,
} from '../types/data.types';

// Importar dados JSON (em um app real, seria uma chamada de API)
import equipmentJson from '../data/equipment.json';
import equipmentModelJson from '../data/equipmentModel.json';
import equipmentStateJson from '../data/equipmentState.json';
import equipmentStateHistoryJson from '../data/equipmentStateHistory.json';
import equipmentPositionHistoryJson from '../data/equipmentPositionHistory.json';

export function useEquipmentData() {
    // Tipagem explícita dos dados importados
    const equipments: Equipment[] = equipmentJson;
    const models: EquipmentModel[] = equipmentModelJson;
    const states: EquipmentState[] = equipmentStateJson;
    const stateHistories: EquipmentStateHistory[] = equipmentStateHistoryJson;
    const positionHistories: EquipmentPositionHistory[] = equipmentPositionHistoryJson;

    const processedData = useMemo(() => {
        // Criar mapas para busca rápida O(1)
        const modelsMap = new Map(models.map(m => [m.id, m]));
        const statesMap = new Map(states.map(s => [s.id, s]));
        const stateHistoryMap = new Map(stateHistories.map(h => [h.equipmentId, h.states]));
        const positionHistoryMap = new Map(positionHistories.map(h => [h.equipmentId, h.positions]));

        // Processar cada equipamento
        const allEquipmentData: EquipmentData[] = equipments.map(eq => {
            const model = modelsMap.get(eq.equipmentModelId);
            const rawStateHistory = stateHistoryMap.get(eq.id) || [];
            const rawPositionHistory = positionHistoryMap.get(eq.id) || [];

            // Ordenar históricos por data (mais recente primeiro)
            const sortedStateHistory = [...rawStateHistory].sort((a, b) =>
                compareDesc(parseISO(a.date), parseISO(b.date))
            );
            const sortedPositionHistory = [...rawPositionHistory].sort((a, b) =>
                compareDesc(parseISO(a.date), parseISO(b.date))
            );

            // Mapear histórico de estados para incluir dados do estado (nome, cor)
            const processedStateHistory: ProcessedEquipmentStateHistoryEntry[] = sortedStateHistory.map(sh => ({
                ...sh,
                state: statesMap.get(sh.equipmentStateId),
            }));

            const latestStateEntry = processedStateHistory[0]; // Primeiro após ordenar desc
            const latestPositionEntry = sortedPositionHistory[0]; // Primeiro após ordenar desc

            return {
                equipment: eq,
                model: model!, // Assumindo que todo equipamento tem modelo
                latestPosition: latestPositionEntry,
                latestState: latestStateEntry,
                stateHistory: processedStateHistory, // Já ordenado
                positionHistory: sortedPositionHistory, // Já ordenado
            };
        }).filter(data => !!data.model); // Filtrar se o modelo não for encontrado por segurança

        return allEquipmentData;

    }, [equipments, models, states, stateHistories, positionHistories]); // Dependências

    return {
        allEquipmentData: processedData,
        allStates: states, // Para usar nos filtros
        allModels: models, // Para usar nos filtros
    };
}