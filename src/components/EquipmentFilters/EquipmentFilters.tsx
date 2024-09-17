import React, { useState } from 'react';

interface EquipmentFiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    modelFilter: string;
    setModelFilter: (model: string) => void;
    stateFilter: string;
    setStateFilter: (state: string) => void;
    equipmentModelList: { id: string, name: string }[];
    equipmentStatesInfoList: { id: string, name: string }[];
}

const EquipmentFilters: React.FC<EquipmentFiltersProps> = ({
    searchTerm,
    setSearchTerm,
    modelFilter,
    setModelFilter,
    stateFilter,
    setStateFilter,
    equipmentModelList,
    equipmentStatesInfoList,
}) => {
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div>
            <div className="row mb-3">
                {/* Input de pesquisa por nome do equipamento */}
                <div className="col-md-8">
                    <input
                        type="text"
                        placeholder="Pesquisar equipamentos por código..."
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Botão de Filtrar */}
                <div className="col-md-4 d-flex">
                    <button
                        className="btn btn-primary w-100"
                        onClick={toggleFilters}
                    >
                        {showFilters ? 'Esconder Filtros' : 'Filtrar'}
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className="row">
                    {/* Select para filtrar por modelo */}
                    <div className="col-md-12 mb-3">
                        <select
                            className="form-control"
                            value={modelFilter}
                            onChange={(e) => setModelFilter(e.target.value)}
                        >
                            <option value="">Todos os modelos</option>
                            {equipmentModelList.map((model) => (
                                <option key={model.id} value={model.name}>
                                    {model.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Select para filtrar por estado */}
                    <div className="col-md-12 mb-3">
                        <select
                            className="form-control"
                            value={stateFilter}
                            onChange={(e) => setStateFilter(e.target.value)}
                        >
                            <option value="">Todos os estados</option>
                            {equipmentStatesInfoList.map((state) => (
                                <option key={state.id} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EquipmentFilters;