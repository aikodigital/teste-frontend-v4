import React from 'react';
import '../styles/map.scss';

const FilterComponent = ({
  equipmentStateFilter,
  equipmentModelFilter,
  searchTerm,
  stateData,
  modelData,
  handleStateFilterChange,
  handleModelFilterChange,
  handleSearchTermChange
}) => (
  <div className="filter_main">
    <div className="filter_main--item">
      <label htmlFor="state">Estado</label>
      <select id="state" onChange={handleStateFilterChange} value={equipmentStateFilter}>
        <option value="">Todos</option>
        {stateData.map(state => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
    <div className="filter_main--item">
      <label htmlFor="model">Modelo:</label>
      <select id="model" onChange={handleModelFilterChange} value={equipmentModelFilter}>
        <option value="">Todos</option>
        {modelData.map(model => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>

    <div className="filter_main--item">
      <label htmlFor="search">Pesquise pelo nome do modelo:</label>
      <input
        id="search"
        type="text"
        placeholder="Digite o nome do modelo"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </div>
  </div>
);

export default FilterComponent;
