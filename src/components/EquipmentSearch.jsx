import React from 'react';
import './EquipmentSearch.css';

function EquipmentSearch({ onSearchChange }) {
  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="equipment-search">
      <label htmlFor="search-input">Pesquisar Equipamento:</label>
      <input
        id="search-input"
        type="text"
        placeholder="Digite o nome do equipamento..."
        onChange={handleSearchInput}
      />
    </div>
  );
}

export default EquipmentSearch;