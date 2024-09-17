import { useState, useEffect } from 'react';
import equipment from './data/equipment.json';
import equipmentPositionHistory from './data/equipmentPositionHistory.json';
import equipmentStateHistory from './data/equipmentStateHistory.json';
import equipmentState from './data/equipmentState.json';
import EquipmentMap from './components/EquipmentMap';

function App() {
  const [equipmentPositions, setEquipmentPositions] = useState([]);

  useEffect(() => {
    // Função para obter o estado pelo ID
    const getStateById = (stateId) => {
      const state = equipmentState.find(state => state.id === stateId);
      return state ? { name: state.name, color: state.color } : { name: 'Desconhecido', color: '#000000' };
    };

    // Preparar os dados de posição e estado dos equipamentos
    const latestPositions = equipmentPositionHistory.map((positionData) => {
      // Encontrar o equipamento correspondente pelo ID
      const equipmentData = equipment.find(e => e.id === positionData.equipmentId);
      if (!equipmentData) {
        console.error(`Equipamento com ID ${positionData.equipmentId} não encontrado.`);
        return null; // Ignorar equipamento que não é encontrado
      }

      // Pegar a posição mais recente
      const latestPosition = positionData.positions[positionData.positions.length - 1];

      // Obter o estado mais recente
      const stateHistory = equipmentStateHistory.find(e => e.equipmentId === positionData.equipmentId);
      if (!stateHistory) {
        console.error(`Histórico de estado não encontrado para o equipamento com ID ${positionData.equipmentId}`);
        return null;
      }

      const latestStateId = stateHistory.states[stateHistory.states.length - 1].equipmentStateId;
      const latestState = getStateById(latestStateId);

      // Preparar o histórico de estados para o modal
      const history = stateHistory.states.map((stateEntry) => {
        const stateInfo = getStateById(stateEntry.equipmentStateId);
        return {
          date: stateEntry.date,
          stateName: stateInfo.name,
        };
      });

      return {
        name: equipmentData.name,
        lat: latestPosition.lat,
        lon: latestPosition.lon,
        state: latestState.name,
        stateColor: latestState.color,
        history: history,
      };
    }).filter(e => e !== null); // Filtrar equipamentos inválidos

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
