import { useState, useEffect } from 'react';
import equipment from './data/equipment.json';
import equipmentPositionHistory from './data/equipmentPositionHistory.json';
import EquipmentMap from './components/EquipmentMap';

function App() {
  const [equipmentPositions, setEquipmentPositions] = useState([]);

  useEffect(() => {
    // Fazendo o merge entre o ID e o nome do equipamento
    const latestPositions = equipmentPositionHistory.map((positionData) => {
      const equipmentData = equipment.find(e => e.id === positionData.equipmentId);
      const latestPosition = positionData.positions[positionData.positions.length - 1];

      return {
        name: equipmentData ? equipmentData.name : 'Sem nome',
        lat: latestPosition.lat,
        lon: latestPosition.lon,
      };
    });

    setEquipmentPositions(latestPositions);
  }, []);

  return (
    <div>
      <h1>Mapa dos Equipamentos</h1>
      <EquipmentMap equipmentPositions={equipmentPositions} />
    </div>
  );
}

export default App;
