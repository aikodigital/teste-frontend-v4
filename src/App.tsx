// src/App.tsx
import React, { useState, useMemo } from 'react';
import { parseISO, isWithinInterval } from 'date-fns';
import MapComponent from './components/MapComponent';
import SidebarComponent from './components/SidebarComponent';
import { useEquipmentData } from './hooks/useEquipmentData';

function App() {
    const { allEquipmentData, allStates } = useEquipmentData();
    const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedStateFilter, setSelectedStateFilter] = useState<string>(''); // ID do estado ou '' para todos
    const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });

    const selectedEquipment = useMemo(() => {
        if (!selectedEquipmentId) return null;
        return allEquipmentData.find(eq => eq.equipment.id === selectedEquipmentId) || null;
    }, [selectedEquipmentId, allEquipmentData]);

    // Filtrar equipamentos para exibir no mapa
    const filteredEquipmentOnMap = useMemo(() => {
        return allEquipmentData.filter(eqData => {
            // Filtro por nome (case-insensitive)
            const nameMatch = eqData.equipment.name.toLowerCase().includes(searchTerm.toLowerCase());

            // Filtro por estado atual
            const stateMatch = selectedStateFilter
                ? eqData.latestState?.equipmentStateId === selectedStateFilter
                : true; // Se nenhum filtro de estado selecionado, todos passam

            return nameMatch && stateMatch;
        });
    }, [allEquipmentData, searchTerm, selectedStateFilter]);

    // Filtrar histórico de posições do equipamento selecionado pelo range de datas
    const filteredPositionHistory = useMemo(() => {
        if (!selectedEquipment || (!dateRange.start && !dateRange.end)) {
            return selectedEquipment?.positionHistory || []; // Retorna todo histórico se não houver filtro de data
        }

        const start = dateRange.start;
        const end = dateRange.end;

        return selectedEquipment.positionHistory.filter(pos => {
            const posDate = parseISO(pos.date);
            if (start && end) {
                return isWithinInterval(posDate, { start, end });
            } else if (start) {
                return posDate >= start;
            } else if (end) {
                return posDate <= end;
            }
            return true;
        });

    }, [selectedEquipment, dateRange]);

    const handleSelectEquipment = (id: string | null) => {
        setSelectedEquipmentId(id);
    };

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    const handleStateFilterChange = (stateId: string) => {
        setSelectedStateFilter(stateId);
    };

     const handleDateRangeChange = (start: Date | null, end: Date | null) => {
        setDateRange({ start, end });
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            {/* Sidebar */}
            <SidebarComponent
                allStates={allStates}
                allEquipments={allEquipmentData}
                selectedEquipment={selectedEquipment}
                onSearchChange={handleSearchChange}
                onStateFilterChange={handleStateFilterChange}
                selectedStateFilter={selectedStateFilter}
                searchTerm={searchTerm}
                onDateRangeChange={handleDateRangeChange}
                dateRange={dateRange}
                onClearSelection={() => handleSelectEquipment(null)}
            />

            {/* Map Area */}
            <div className="flex-grow h-full">
                <MapComponent
                    equipmentList={filteredEquipmentOnMap}
                    onSelectEquipment={handleSelectEquipment}
                    selectedEquipmentId={selectedEquipmentId}
                    positionHistoryTrail={filteredPositionHistory} // Passa o histórico filtrado
                />
            </div>
        </div>
    );
}

export default App;