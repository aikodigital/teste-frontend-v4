import React, { useState } from 'react';
import MapDisplay from '../MapDisplay/MapDisplay';
import './MapComponent.scss'
import equipment from '../../data/equipment.json';
import equipmentModel from '../../data/equipmentModel.json';
import equipmentState from '../../data/equipmentState.json';

const MapComponent = () => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [stateFilter, setStateFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');

  const handleStateFilterChange = (e) => setStateFilter(e.target.value);
  const handleModelFilterChange = (e) => setModelFilter(e.target.value);

  return (
    <div>
      <div className='container-filters' style={{ marginBottom: '10px' }}>
        <label>
          Filtrar por Estado:
          <select onChange={handleStateFilterChange}>
            <option value=''>Todos</option>
            {equipmentState.map(state => (
              <option key={state.id} value={state.name}>{state.name}</option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: '10px' }}>
          Filtrar por Modelo:
          <select onChange={handleModelFilterChange}>
            <option value=''>Todos</option>
            {equipmentModel.map(model => (
              <option key={model.id} value={model.name}>{model.name}</option>
            ))}
          </select>
        </label>
      </div>

      <MapDisplay
        equipment={equipment}
        stateFilter={stateFilter}
        modelFilter={modelFilter}
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
      />
    </div>
  );
};

export default MapComponent;
