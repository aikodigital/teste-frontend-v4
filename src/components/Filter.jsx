import React from 'react';

const Filter = ({ searchTerm, setSearchTerm, filterState, setFilterState, filterModel, setFilterModel, equipments }) => {
    return (
        <div className="absolute top-4 left-1/9 transform -translate-x-1/2 z-9999 bg-white p-2 rounded-md shadow-md w-80">
            <input
                type="text"
                placeholder="Buscar máquina..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded-md w-full mb-2"
            />
            {/* Filtro por estado */}
            <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="p-2 border rounded-md w-full mb-2"
            >
                <option value="">Filtrar por estado</option>
                <option value="Operando">Operando</option>
                <option value="Manutenção">Manutenção</option>
                <option value="Parado">Parado</option>
                <option value="Desconhecido">Desconhecido</option>
            </select>

            {/* Filtro por modelo */}
            <select
                value={filterModel}
                onChange={(e) => setFilterModel(e.target.value)}
                className="p-2 border rounded-md w-full"
            >
                <option value="">Filtrar por modelo</option>
                {equipments
                    .map((equipment) => equipment.model?.name)
                    .filter((value, index, self) => self.indexOf(value) === index) // Remover duplicados
                    .map((modelName) => (
                        <option key={modelName} value={modelName}>
                            {modelName}
                        </option>
                    ))}
            </select>
        </div>
    );
};

export default Filter;
