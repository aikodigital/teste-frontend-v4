import React from 'react';
import '../styles/filterPanel.scss';

interface FilterPanelProps {
  onFilterChange: (filter: string) => void;
  selectedFilter: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, selectedFilter }) => {

  const handleFilterChange = (filter: string) => {
    onFilterChange(filter); // Atualiza o filtro no componente pai
  };

  return (
    <div className="filter-panel">
      <h3>Filtrar Equipamentos</h3>
      <div className="filter-buttons">
        <button
          className={selectedFilter === 'Todos' ? 'active' : ''}
          onClick={() => handleFilterChange('Todos')}
        >
          Todos
        </button>
        <button
          className={selectedFilter === 'Operando' ? 'active' : ''}
          onClick={() => handleFilterChange('Operando')}
        >
          Operando
        </button>
        <button
          className={selectedFilter === 'Parado' ? 'active' : ''}
          onClick={() => handleFilterChange('Parado')}
        >
          Parado
        </button>
        <button
          className={selectedFilter === 'Manutenção' ? 'active' : ''}
          onClick={() => handleFilterChange('Manutenção')}
        >
          Manutenção
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
