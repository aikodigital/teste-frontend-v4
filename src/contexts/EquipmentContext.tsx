import { createContext, useMemo, useCallback } from "react";
import { 
    Equipment, 
    EquipmentContextType
} from "../types/equipment";
import { getEquipmentTypeFromModel } from "../utils/equipmentUtils";
import { getEquipmentStateAtDate, getEquipmentPositionAtDate } from "../utils/equipmentQueries";
import { useEquipmentData } from "../hooks/useEquipmentData";
import { useEquipmentFilters } from "../hooks/useEquipmentFilters";
import { useEquipmentTimeline } from "../hooks/useEquipmentTimeline";

const EquipmentContext = createContext<EquipmentContextType | null>(null);

export function EquipmentProvider({ children }: { children: React.ReactNode }) {
    // Use custom hooks to separate responsibilities
    const {
        equipment,
        equipmentModels,
        equipmentStates,
        stateHistory,
        positionHistory,
        equipmentNames,
        loading,
        error
    } = useEquipmentData();

    const {
        typeFilters,
        stateFilters,
        toggleTypeFilter,
        toggleStateFilter
    } = useEquipmentFilters();

    const {
        selectedDate,
        selectedEquipmentId,
        updateSelectedDate,
        advanceTime,
        jumpToTime,
        openEquipmentHistory,
        closeEquipmentHistory
    } = useEquipmentTimeline();

    // Helper functions
    const getEquipmentName = useCallback((equipmentId: string): string => {
        return equipmentNames[equipmentId] || 'Equipamento Desconhecido';
    }, [equipmentNames]);

    const getEquipmentById = useCallback((equipmentId: string): Equipment | undefined => {
        return equipment.find(eq => eq.id === equipmentId);
    }, [equipment]);

    // Wrap the utility functions with the current state
    const getEquipmentStateAtSelectedDate = useCallback((equipmentId: string, date: Date): string | undefined => {
        return getEquipmentStateAtDate(stateHistory, equipmentId, date);
    }, [stateHistory]);

    const getEquipmentPositionAtSelectedDate = useCallback((equipmentId: string, date: Date): [number, number] | null => {
        return getEquipmentPositionAtDate(positionHistory, equipmentId, date);
    }, [positionHistory]);

    // Filtered equipment based on active filters
    const filteredEquipment = useMemo(() => {
        if (loading || error) return [];
        
        return equipment.filter(eq => {
            // Filter by equipment type
            const model = equipmentModels.find(m => m.id === eq.equipmentModelId);
            if (!model) return false;
            
            const equipmentType = getEquipmentTypeFromModel(model.name);
            const typeFilterActive = typeFilters.some(f => f.active);
            
            if (typeFilterActive) {
                const matchesTypeFilter = typeFilters.some(
                    filter => filter.active && filter.id === equipmentType
                );
                if (!matchesTypeFilter) return false;
            }
            
            // Filter by equipment state at selected date
            const stateAtDate = getEquipmentStateAtSelectedDate(eq.id, selectedDate);
            if (!stateAtDate) return false;
            
            const stateFilterActive = stateFilters.some(f => f.active);
            
            if (stateFilterActive) {
                const stateInfo = equipmentStates.find(s => s.id === stateAtDate);
                if (!stateInfo) return false;
                
                let stateType = '';
                if (stateInfo.name === 'Operando') stateType = 'operating';
                else if (stateInfo.name === 'Parado') stateType = 'stopped';
                else if (stateInfo.name === 'Manutenção') stateType = 'maintenance';
                
                const matchesStateFilter = stateFilters.some(
                    filter => filter.active && filter.id === stateType
                );
                if (!matchesStateFilter) return false;
            }
            
            // Check if has position at selected date
            const hasPositionAtDate = getEquipmentPositionAtSelectedDate(eq.id, selectedDate) !== null;
            return hasPositionAtDate;
        });
    }, [
        equipment, 
        equipmentModels, 
        equipmentStates,
        typeFilters, 
        stateFilters, 
        selectedDate, 
        getEquipmentStateAtSelectedDate,
        getEquipmentPositionAtSelectedDate,
        loading, 
        error
    ]);

    // Prepare context value
    const contextValue = useMemo(() => ({
        // Base data
        equipment, 
        equipmentModels, 
        equipmentStates, 
        stateHistory, 
        positionHistory,
        equipmentNames,
        getEquipmentName,
        getEquipmentById,
        
        // Filters
        typeFilters,
        stateFilters,
        toggleTypeFilter,
        toggleStateFilter,
        filteredEquipment,
        
        // Timeline
        selectedDate,
        updateSelectedDate,
        getEquipmentStateAtDate: getEquipmentStateAtSelectedDate,
        getEquipmentPositionAtDate: getEquipmentPositionAtSelectedDate,
        advanceTime,
        jumpToTime,
        
        // Equipment history
        selectedEquipmentId,
        openEquipmentHistory,
        closeEquipmentHistory,

        // Status
        loading, 
        error 
    }), [
        equipment, 
        equipmentModels, 
        equipmentStates, 
        stateHistory, 
        positionHistory,
        equipmentNames,
        getEquipmentName,
        getEquipmentById,
        typeFilters,
        stateFilters,
        toggleTypeFilter,
        toggleStateFilter,
        filteredEquipment,
        selectedDate,
        updateSelectedDate,
        getEquipmentStateAtSelectedDate,
        getEquipmentPositionAtSelectedDate,
        advanceTime,
        jumpToTime,
        selectedEquipmentId,
        openEquipmentHistory,
        closeEquipmentHistory,
        loading, 
        error
    ]);

    return (
        <EquipmentContext.Provider value={contextValue}>
            {children}
        </EquipmentContext.Provider>
    );
}

export { EquipmentContext };