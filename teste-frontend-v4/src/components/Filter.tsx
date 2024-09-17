import React, { useState } from "react";
import { useEquipmentContext } from "../contexts/equipment";

const Filter: React.FC = () => {
  const { filterByState, filterByModel, clearFilters } = useEquipmentContext();
  const [selectedState, setSelectedState] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    if (stateName) {
      filterByState(stateName);
    } else {
      filterByState(""); // Aplica todos os estados quando o filtro é limpo
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelName = e.target.value;
    setSelectedModel(modelName);
    if (modelName) {
      filterByModel(modelName);
    } else {
      filterByModel(""); // Aplica todos os modelos quando o filtro é limpo
    }
  };

  const handleClearFilters = () => {
    setSelectedState(""); // Limpa o estado selecionado
    setSelectedModel(""); // Limpa o modelo selecionado
    clearFilters(); // Limpa os filtros aplicados
  };

  return (
    <div className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex space-x-4">
        <div className="flex flex-col flex-1">
          <label className="mb-2 text-gray-700" htmlFor="select-state">
            Filtrar por Estado:
          </label>
          <select
            id="select-state"
            value={selectedState}
            onChange={handleStateChange}
            className="p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Todos</option>
            <option value="Operando">Operando</option>
            <option value="Parado">Parado</option>
            <option value="Manutenção">Em manutenção</option>
          </select>
        </div>

        <div className="flex flex-col flex-1">
          <label htmlFor="select-model" className="mb-2 text-gray-700">
            Filtrar por Modelo:
          </label>
          <select
            id="select-model"
            value={selectedModel}
            onChange={handleModelChange}
            className="p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Todos</option>
            <option value="Caminhão de carga">Caminhão de carga</option>
            <option value="Harvester">Harvester</option>
            <option value="Garra traçadora">Garra Traçadora</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleClearFilters}
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Limpar Filtros
      </button>
    </div>
  );
};

export { Filter };
