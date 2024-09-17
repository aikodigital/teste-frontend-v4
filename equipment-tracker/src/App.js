import { useState, useEffect } from 'react';
import './App.css';
import equipment from './data/equipment.json';
import equipmentPositionHistory from './data/equipmentPositionHistory.json';
import equipmentStateHistory from './data/equipmentStateHistory.json';
import equipmentState from './data/equipmentState.json';
import equipmentModel from './data/equipmentModel.json';
import EquipmentMap from './components/EquipmentMap';

function App() {
  const [equipmentPositions, setEquipmentPositions] = useState([]);

  useEffect(() => {
    const latestPositions = equipmentPositionHistory.map((positionData) => {
      const equipmentData = equipment.find(e => e.id === positionData.equipmentId);
      const latestPosition = positionData.positions[positionData.positions.length - 1];

      // Obtendo o estado mais recente
      const stateHistory = equipmentStateHistory.find(e => e.equipmentId === positionData.equipmentId);
      const latestStateId = stateHistory ? stateHistory.states[stateHistory.states.length - 1].equipmentStateId : null;
      const latestState = latestStateId ? equipmentState.find(state => state.id === latestStateId) : null;

      // Associando o modelo de equipamento
      const model = equipmentModel.find(m => m.id === equipmentData.equipmentModelId);
      const earningsPerHour = model ? model.hourlyEarnings.find(e => e.equipmentStateId === latestStateId) : null;
      const hourlyEarnings = earningsPerHour ? earningsPerHour.value : 0;

      // Cálculo do ganho total
      let totalEarnings = 0;
      const history = stateHistory ? stateHistory.states.map((stateEntry, index) => {
        const state = equipmentState.find(s => s.id === stateEntry.equipmentStateId);
        const earnings = model ? model.hourlyEarnings.find(e => e.equipmentStateId === stateEntry.equipmentStateId) : null;
        const earningsValue = earnings ? earnings.value : 0;

        // Calcular a diferença de tempo entre esse estado e o próximo
        const nextEntry = stateHistory.states[index + 1];
        const endTime = nextEntry ? new Date(nextEntry.date) : new Date();  // Se for o último, usa o tempo atual
        const duration = (endTime - new Date(stateEntry.date)) / (1000 * 60 * 60);  // Duração em horas
        const stateEarnings = earningsValue * duration;
        totalEarnings += stateEarnings;

        return {
          date: stateEntry.date,
          name: state ? state.name : 'Sem nome',
          earnings: earningsValue,
          duration: duration.toFixed(2),  // Duração em horas
          stateEarnings: stateEarnings.toFixed(2),  // Ganhos nesse estado
        };
      }) : [];

      return {
        name: equipmentData ? equipmentData.name : 'Sem nome',
        lat: latestPosition.lat,
        lon: latestPosition.lon,
        state: latestState ? latestState.name : 'Sem estado',
        stateColor: latestState ? latestState.color : '#000000',
        hourlyEarnings: hourlyEarnings,  // Ganhos por hora no estado atual
        history: history,
        totalEarnings: totalEarnings.toFixed(2),  // Ganhos totais calculados
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
