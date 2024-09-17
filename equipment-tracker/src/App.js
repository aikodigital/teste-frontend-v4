import { useState, useEffect } from 'react';
import equipment from './data/equipment.json';
import equipmentPositionHistory from './data/equipmentPositionHistory.json';
import equipmentStateHistory from './data/equipmentStateHistory.json';
import equipmentState from './data/equipmentState.json';
import equipmentModel from './data/equipmentModel.json'; // Adiciona o import do equipmentModel
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

      // Preparando o histórico de estados para o modal
      const history = stateHistory ? stateHistory.states.map((stateEntry, index) => {
        const state = equipmentState.find(s => s.id === stateEntry.equipmentStateId);
        const duration = calculateDuration(stateEntry.date, stateHistory.states[index + 1]?.date || new Date().toISOString());
        const hourlyEarnings = getHourlyEarnings(equipmentData.equipmentModelId, stateEntry.equipmentStateId);
        const stateEarnings = duration * hourlyEarnings;

        return {
          date: stateEntry.date,
          name: state ? state.name : 'Sem nome',
          duration,
          stateEarnings,
        };
      }) : [];

      // Calcula o ganho total
      const totalEarnings = history.reduce((total, entry) => total + entry.stateEarnings, 0);

      // Calcula o percentual de produtividade
      const totalHours = history.reduce((total, entry) => total + entry.duration, 0);
      const operatingHours = history.reduce((total, entry) => entry.name === 'Operando' ? total + entry.duration : total, 0);
      const productivityPercentage = totalHours > 0 ? (operatingHours / totalHours) * 100 : 0;

      return {
        name: equipmentData ? equipmentData.name : 'Sem nome',
        lat: latestPosition.lat,
        lon: latestPosition.lon,
        state: latestState ? latestState.name : 'Sem estado',
        stateColor: latestState ? latestState.color : '#000000',
        history,
        totalEarnings,
        productivityPercentage, // Adiciona o percentual de produtividade
      };
    });

    setEquipmentPositions(latestPositions);
  }, []);

  // Função para calcular a duração em horas entre duas datas
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return (end - start) / (1000 * 60 * 60); // Converte milissegundos para horas
  };

  // Função para obter o valor por hora do estado
  const getHourlyEarnings = (equipmentModelId, equipmentStateId) => {
    const model = equipmentModel.find(m => m.id === equipmentModelId);
    if (model) {
      const hourlyEarning = model.hourlyEarnings.find(e => e.equipmentStateId === equipmentStateId);
      return hourlyEarning ? hourlyEarning.value : 0;
    }
    return 0;
  };

  return (
    <div>
      <h1>Mapa dos Equipamentos</h1>
      <EquipmentMap equipmentPositions={equipmentPositions} />
    </div>
  );
}

export default App;
