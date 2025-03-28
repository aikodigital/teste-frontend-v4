// src/components/SidebarComponent.tsx
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { EquipmentData, EquipmentState } from '../types/data.types';
import { parseISO } from 'date-fns'; 

interface SidebarComponentProps {
    allStates: EquipmentState[];
    allEquipments: EquipmentData[];
    selectedEquipment: EquipmentData | null;
    onSearchChange: (term: string) => void;
    onStateFilterChange: (stateId: string) => void;
    selectedStateFilter: string;
    searchTerm: string;
    onDateRangeChange: (start: Date | null, end: Date | null) => void;
    dateRange: { start: Date | null; end: Date | null };
    onClearSelection: () => void;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({
    allStates,
    selectedEquipment,
    onSearchChange,
    onStateFilterChange,
    selectedStateFilter,
    searchTerm,
    onDateRangeChange,
    dateRange,
    onClearSelection,
}) => {

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStart = e.target.value ? new Date(e.target.value + "T00:00:00") : null; // Adiciona T00:00:00 para evitar problemas de fuso horário apenas na data
        onDateRangeChange(newStart, dateRange.end);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEnd = e.target.value ? new Date(e.target.value + "T23:59:59") : null; // Adiciona T23:59:59 para incluir o dia inteiro
        onDateRangeChange(dateRange.start, newEnd);
    };

    return (
        <div className="w-80 md:w-96 h-full bg-gray-100 p-4 overflow-y-auto shadow-lg flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Controle Florestal</h2>

            {/* Filtros Gerais */}
            <div className="mb-6 border-b pb-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Filtros</h3>
                <div className="mb-3">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-600 mb-1">
                        Pesquisar Equipamento
                    </label>
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Digite o nome..."
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="stateFilter" className="block text-sm font-medium text-gray-600 mb-1">
                        Filtrar por Estado Atual
                    </label>
                    <select
                        id="stateFilter"
                        value={selectedStateFilter}
                        onChange={(e) => onStateFilterChange(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Todos os Estados</option>
                        {allStates.map(state => (
                            <option key={state.id} value={state.id}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Detalhes do Equipamento Selecionado */}
            {selectedEquipment ? (
                <div className="flex-grow">
                     <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">Detalhes do Equipamento</h3>
                         <button
                            onClick={onClearSelection}
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                         >
                            Limpar Seleção
                         </button>
                    </div>

                    <div className="bg-white p-3 rounded shadow mb-4">
                        <p className="text-xl font-bold">{selectedEquipment.equipment.name}</p>
                        <p className="text-sm text-gray-600">{selectedEquipment.model.name}</p>
                        {selectedEquipment.latestState?.state && (
                            <p>
                                Estado Atual:
                                <span
                                    className="font-semibold ml-1"
                                    style={{ color: selectedEquipment.latestState.state.color }}
                                >
                                    {selectedEquipment.latestState.state.name}
                                </span>
                                <span className='text-xs text-gray-500 ml-1'>
                                    ({format(parseISO(selectedEquipment.latestState.date), "dd/MM HH:mm", { locale: ptBR })})
                                </span>
                            </p>
                        )}
                        {selectedEquipment.latestPosition && (
                             <p className="text-xs text-gray-500">
                                Última Posição: {format(parseISO(selectedEquipment.latestPosition.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                            </p>
                        )}
                    </div>

                     {/* Filtro de Data para Histórico de Posição */}
                     <div className="mb-4 border-t pt-4">
                        <h4 className="text-md font-semibold mb-2 text-gray-700">Histórico de Posições (Trilha)</h4>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <label htmlFor="startDate" className="block text-xs font-medium text-gray-600 mb-1">De:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={dateRange.start ? format(dateRange.start, 'yyyy-MM-dd') : ''}
                                    onChange={handleStartDateChange}
                                    className="w-full p-1 border border-gray-300 rounded text-sm"
                                />
                            </div>
                             <div>
                                <label htmlFor="endDate" className="block text-xs font-medium text-gray-600 mb-1">Até:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={dateRange.end ? format(dateRange.end, 'yyyy-MM-dd') : ''}
                                    onChange={handleEndDateChange}
                                    className="w-full p-1 border border-gray-300 rounded text-sm"
                                />
                            </div>
                        </div>
                          <p className="text-xs text-gray-500">Selecione o período para ver a trilha no mapa.</p>
                    </div>


                    {/* Histórico de Estados */}
                    <div className="border-t pt-4">
                        <h4 className="text-md font-semibold mb-2 text-gray-700">Histórico de Estados</h4>
                        <ul className="space-y-2 max-h-60 overflow-y-auto pr-1"> 
                            {selectedEquipment.stateHistory.length > 0 ? (
                                selectedEquipment.stateHistory.map((entry, index) => (
                                    <li key={index} className="flex justify-between items-center text-sm border-b pb-1">
                                        <span
                                            className="font-medium"
                                            style={{ color: entry.state?.color ?? '#000' }}
                                        >
                                            {entry.state?.name ?? 'Desconhecido'}
                                        </span>
                                        <span className="text-gray-600">
                                            {format(parseISO(entry.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-sm text-gray-500">Nenhum histórico de estado encontrado.</li>
                            )}
                        </ul>
                    </div>

                </div>
            ) : (
                <div className="flex-grow flex items-center justify-center text-gray-500">
                    <p>Selecione um equipamento no mapa para ver os detalhes.</p>
                </div>
            )}
        </div>
    );
};

export default SidebarComponent;