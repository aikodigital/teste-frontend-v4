import React, { useEffect, useState } from 'react';
import { fetchData } from '../dataUtils';
import FilterComponent from './FilterComponent';
import EquipmentMap from './EquipmentMap';
import EquipmentDetails from './EquipmentDetails';
import { getIcon, calculateProductivity, calculateGain, generateHistoryContent, getStateName } from '../utils/mapUtils';

const MapComponent = () => {
  const [equipmentData, setEquipmentData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [stateHistoryData, setStateHistoryData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [equipmentStateFilter, setEquipmentStateFilter] = useState('');
  const [equipmentModelFilter, setEquipmentModelFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedEquipmentPositions, setSelectedEquipmentPositions] = useState([]);

  const openDetails = (equipment) => {
    setSelectedEquipment(equipment);
    const positions = positionData.find(p => p.equipmentId === equipment.id);
    setSelectedEquipmentPositions(positions ? positions.positions : []);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelectedEquipmentPositions([]);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setEquipmentData(data.equipment || []);
        setModelData(data.equipmentModel || []);
        setPositionData(data.equipmentPositionHistory || []);
        setStateData(data.equipmentState || []);
        setStateHistoryData(data.equipmentStateHistory || []);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (equipmentData.length > 0 && positionData.length > 0 && stateData.length > 0 && stateHistoryData.length > 0) {
      const combined = equipmentData.map(equipment => {
        const position = positionData.find(p => p.equipmentId === equipment.id);
        const stateHistory = stateHistoryData.find(sh => sh.equipmentId === equipment.id);
        const currentState = stateHistory ? stateData.find(state => state.id === stateHistory.states[stateHistory.states.length - 1].equipmentStateId) : null;
        const model = modelData.find(m => m.id === equipment.equipmentModelId);

        return {
          ...equipment,
          lat: position ? position.positions[0].lat : null,
          lon: position ? position.positions[0].lon : null,
          state: currentState,
          stateHistory: stateHistory ? stateHistory.states : [],
          model: model
        };
      });
      setCombinedData(combined);
    }
  }, [equipmentData, positionData, stateData, stateHistoryData, modelData]);

  const handleStateFilterChange = (event) => {
    setEquipmentStateFilter(event.target.value);
  };

  const handleModelFilterChange = (event) => {
    setEquipmentModelFilter(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterByState = (data, state) => {
    return data.filter(equipment => {
      if (state) {
        return equipment.state && equipment.state.id === state;
      }
      return true;
    });
  };

  const filterByModel = (data, model) => {
    return data.filter(equipment => {
      if (model) {
        return equipment.model && equipment.model.id === model;
      }
      return true;
    });
  };

  const filterBySearchTerm = (data, term) => {
    return data.filter(equipment => {
      if (term) {
        const termLower = term.toLowerCase();
        const modelName = equipment.model ? equipment.model.name.toLowerCase() : '';
        const equipmentName = equipment.name ? equipment.name.toLowerCase() : '';
        return modelName.includes(termLower) || equipmentName.includes(termLower);
      }
      return true;
    });
  };

  const filteredData = filterBySearchTerm(
    filterByModel(filterByState(combinedData, equipmentStateFilter), equipmentModelFilter),
    searchTerm
  );

  return (
    <div>
      <FilterComponent
        equipmentStateFilter={equipmentStateFilter}
        equipmentModelFilter={equipmentModelFilter}
        searchTerm={searchTerm}
        stateData={stateData}
        modelData={modelData}
        handleStateFilterChange={handleStateFilterChange}
        handleModelFilterChange={handleModelFilterChange}
        handleSearchTermChange={handleSearchTermChange}
      />

      <EquipmentMap
        filteredData={filteredData}
        getIcon={getIcon}
        calculateProductivity={(stateHistory) => calculateProductivity(stateHistory, stateData)}
        calculateGain={calculateGain}
        setSelectedEquipment={openDetails}
        selectedEquipmentPositions={selectedEquipmentPositions}
      />

      {detailsOpen && selectedEquipment && (
        <EquipmentDetails
          selectedEquipment={selectedEquipment}
          generateHistoryContent={(history) => generateHistoryContent(history, stateData)}
          onClose={closeDetails}
        />
      )}
    </div>
  );
};

export default MapComponent;
