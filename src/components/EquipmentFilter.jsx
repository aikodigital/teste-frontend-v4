import React from 'react';
import './EquipmentFilter.css';

function EquipmentFilter({ states, models, onStateFilterChange, onModelFilterChange }) {
  return (
    <div className="equipment-filter">
      <div className="filter-group">
        <label htmlFor="state-filter">Filtrar por Estado:</label>
        <select 
          id="state-filter" 
          onChange={(e) => onStateFilterChange(e.target.value)}
          defaultValue=""
        >
          <option value="">Todos os Estados</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="model-filter">Filtrar por Modelo:</label>
        <select 
          id="model-filter" 
          onChange={(e) => onModelFilterChange(e.target.value)}
          defaultValue=""
        >
          <option value="">Todos os Modelos</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default EquipmentFilter;