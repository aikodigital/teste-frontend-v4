import { useState, useCallback } from 'react';
import { FilterOption } from '../types/equipment';

export function useEquipmentFilters() {
    const [typeFilters, setTypeFilters] = useState<FilterOption[]>([
        { id: 'truck', label: 'Caminhão', active: false },
        { id: 'harvester', label: 'Colheitadeira', active: false },
        { id: 'garra', label: 'Garra', active: false },
    ]);

    const [stateFilters, setStateFilters] = useState<FilterOption[]>([
        { id: 'operating', label: 'Operando', active: false },
        { id: 'stopped', label: 'Parado', active: false },
        { id: 'maintenance', label: 'Manutenção', active: false },
    ]);

    const toggleTypeFilter = useCallback((id: string): void => {
        setTypeFilters(prev => 
            prev.map(filter => filter.id === id ? { ...filter, active: !filter.active } : filter)
        );
    }, []);

    const toggleStateFilter = useCallback((id: string): void => {
        setStateFilters(prev => 
            prev.map(filter => filter.id === id ? { ...filter, active: !filter.active } : filter)
        );
    }, []);

    return {
        typeFilters,
        stateFilters,
        toggleTypeFilter,
        toggleStateFilter
    };
}