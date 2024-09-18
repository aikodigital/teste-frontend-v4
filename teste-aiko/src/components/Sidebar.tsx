import React, { useState, useEffect } from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';
import './Sidebar.css';
import { Equipment, EquipmentModel, EquipmentStateHistory, EquipmentState } from '../types';
import Calculator from './calculator';
import History from './HistoryPosition';


interface SidebarProps {
    onApplyFilters: (filters: Filters) => void;
    onClearFilters?: () => void;
    equipmentData: Equipment[];
    equipmentModelData: EquipmentModel[];
    equipmentStateData: EquipmentState[];
    equipmentStateHistoryData: EquipmentStateHistory[];
    onFilter?: (positions: { lat: number, lon: number }[]) => void;
}

interface Filters {
    name: string[];
    model: string[];
    state: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
    onApplyFilters,
    onClearFilters,
    equipmentData,
    equipmentModelData,
    equipmentStateData, onFilter
}) => {
    const [nameOptions, setNameOptions] = useState<{ value: string; label: string }[]>([]);
    const [modelOptions, setModelOptions] = useState<{ value: string; label: string }[]>([]);
    const [stateOptions, setStateOptions] = useState<{ value: string; label: string }[]>([]);
    const [selectedNames, setSelectedNames] = useState<{ value: string; label: string }[]>([]);
    const [selectedModels, setSelectedModels] = useState<{ value: string; label: string }[]>([]);
    const [selectedStates, setSelectedStates] = useState<{ value: string; label: string }[]>([]);
    const [filteredPositions, setFilteredPositions] = useState<{ lat: number; lon: number }[]>([]);

    const handleFilteredPositions = (positions: { lat: number; lon: number }[]) => {
        //  console.log(positions);
        setFilteredPositions(positions);
        if (onFilter) {
            onFilter(positions);
        }
    };
    useEffect(() => {
        const nameOptions = equipmentData.map(equipment => ({ value: equipment.name, label: equipment.name }));
        const modelOptions = equipmentModelData.map(model => ({ value: model.name, label: model.name }));
        const stateOptions = equipmentStateData.map(state => ({ value: state.name, label: state.name }));

        setNameOptions(nameOptions);
        setModelOptions(modelOptions);
        setStateOptions(stateOptions);
    }, [equipmentData, equipmentModelData, equipmentStateData]);

    const handleApplyFilters = () => {
        const newFilters: Filters = {
            name: selectedNames.map(option => option.value),
            model: selectedModels.map(option => option.value),
            state: selectedStates.map(option => option.value),
        };
        onApplyFilters(newFilters);
    };

    const handleClearFilters = () => {
        setSelectedNames([]);
        setSelectedModels([]);
        setSelectedStates([]);
        if (onClearFilters) {
            onClearFilters();
        }
    };

    const handleNamesChange = (newValue: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
        setSelectedNames(newValue as { value: string; label: string }[]);
    };

    const handleModelsChange = (newValue: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
        setSelectedModels(newValue as { value: string; label: string }[]);
    };

    const handleStatesChange = (newValue: MultiValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
        setSelectedStates(newValue as { value: string; label: string }[]);
    };


    return (
        <div className="sidebar">
            <h3> FILTROS </h3>
            <div className="filter-controls">
                <button onClick={handleApplyFilters}>Aplicar Filtros</button>
                <button onClick={handleClearFilters}>Limpar Filtros</button>
            </div>
            <div className="filter-inputs">
                <Select
                    isMulti
                    options={nameOptions}
                    value={selectedNames}
                    onChange={handleNamesChange}
                    placeholder="Selecione nomes"
                    className="filter-select"
                />
                <Select
                    isMulti
                    options={modelOptions}
                    value={selectedModels}
                    onChange={handleModelsChange}
                    placeholder="Selecione modelos"
                    className="filter-select"
                />
                <Select
                    isMulti
                    options={stateOptions}
                    value={selectedStates}
                    onChange={handleStatesChange}
                    placeholder="Selecione estados"
                    className="filter-select"
                />

                <Calculator
                    equipmentData={equipmentData}
                    equipmentModelData={equipmentModelData}
                />

                <History
                    equipmentData={equipmentData}
                    onFilter={handleFilteredPositions}
                />


            </div>
        </div>
    );
};

export default Sidebar;
