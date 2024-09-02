import React, { useEffect, useState } from 'react';
import MapComponent from '../components/MapComponent';

const EquipmentPage = () => {
  const [equipmentPositions, setEquipmentPositions] = useState([]);
  const [equipmentStates, setEquipmentStates] = useState([]);

  useEffect(() => {
    // Substitua pela lógica de carregamento dos dados JSON
    fetch('/data/equipmentPositionHistory.json')
      .then((response) => response.json())
      .then((data) => {
        setEquipmentPositions(data);
      });

    fetch('/data/equipmentStateHistory.json')
      .then((response) => response.json())
      .then((data) => {
        setEquipmentStates(data);
      });
  }, []);

  return (
    <div>
      <h1>Equipment Map</h1>
      <MapComponent equipmentPositions={equipmentPositions} equipmentStates={equipmentStates} />
    </div>
  );
};

export default EquipmentPage;
