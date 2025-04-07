import { useState, FC, useRef } from "react";
import { useEquipment } from "../hooks/useEquipment";
import FilterDropdown from "./filter/FilterDropdown";
import DateTimeFilter from "./filter/DateTimeFilter";
import { useClickOutside } from "../hooks/useClickOutside";

const Filter: FC = () => {
    // Obtém dados e funções do contexto global de equipamentos
    const {
        typeFilters,
        stateFilters,
        toggleTypeFilter,
        toggleStateFilter,
        selectedDate,
        updateSelectedDate,
    } = useEquipment();

    // Controla qual dropdown está aberto para evitar múltiplos dropdowns abertos simultaneamente
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    
    // Referência para o container dos filtros
    const filterContainerRef = useRef<HTMLDivElement>(null);

    // Usa o hook useClickOutside para fechar os dropdowns quando clicar fora deles
    useClickOutside(filterContainerRef, () => {
        if (openDropdown) {
            setOpenDropdown(null);
        }
    });

    // Alterna entre abrir o dropdown selecionado ou fechar se já estiver aberto
    const toggleDropdown = (dropdown: string) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    // Calcula contadores para exibir badges visuais nos filtros ativos
    const activeTypeFilters = typeFilters.filter(f => f.active).length;
    const activeStateFilters = stateFilters.filter(f => f.active).length;

    return (
        <div className="bg-white rounded-lg shadow-sm p-3 mb-4" ref={filterContainerRef}>
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-medium text-gray-600">Filtros</h2>
            </div>

            <div className="flex flex-wrap gap-3">
                {/* Filtro de data limitado ao período de fevereiro/2021 conforme requisitos do projeto */}
                <div className="flex-1 min-w-[240px]">
                    <DateTimeFilter 
                        selectedDate={selectedDate}
                        onDateChange={updateSelectedDate}
                        minDate="2021-02-01T00:00"
                        maxDate="2021-02-28T23:59"
                    />
                </div>

                <div className="flex gap-3">
                    {/* Dropdown para filtrar por tipo de equipamento */}
                    <FilterDropdown
                        label="Tipo"
                        filters={typeFilters}
                        toggleFilter={toggleTypeFilter}
                        activeCount={activeTypeFilters}
                        isOpen={openDropdown === 'type'}
                        onToggle={() => toggleDropdown('type')}
                        colorScheme="blue"
                    />

                    {/* Dropdown para filtrar por estado operacional do equipamento */}
                    <FilterDropdown
                        label="Estado"
                        filters={stateFilters}
                        toggleFilter={toggleStateFilter}
                        activeCount={activeStateFilters}
                        isOpen={openDropdown === 'state'}
                        onToggle={() => toggleDropdown('state')}
                        colorScheme="purple"
                    />
                </div>
            </div>
        </div>
    );
};

export default Filter;