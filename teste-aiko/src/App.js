import React, { useEffect, useState } from 'react';
import Map from './components/Map.tsx';
import equipmentPositionsData from './data/equipmentPositionHistory.json'; // Dados JSON

function App() {
  const [equipmentPositions, setEquipmentPositions] = useState([]);

  useEffect(() => {
    // Simulação de carregar dados JSON
    const fetchData = async () => {
      const validPositions = equipmentPositionsData
        .map(equipment => {
          // Pegando a posição mais recente do equipamento
          const recentPosition = equipment.positions[0];

          // Verificando se a posição recente possui lat e lon válidos
          if (recentPosition && typeof recentPosition.lat === 'number' && typeof recentPosition.lon === 'number') {
            return {
              id: equipment.equipmentId,
              position: {
                lat: recentPosition.lat,
                lon: recentPosition.lon,
              },
            };
          } else {
            console.warn("Posição inválida encontrada para equipamento ID:", equipment.equipmentId, recentPosition);
            return null; // Retorna null se a posição for inválida
          }
        })
        .filter(equipment => equipment !== null); // Filtra as posições inválidas

      setEquipmentPositions(validPositions);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Equipamentos de Operação Florestal</h1>
      <Map equipmentPositions={equipmentPositions} />
    </div>
  );
}

export default App;
