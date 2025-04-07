import axios from 'axios';

// Função para buscar dados dos arquivos JSON
export const fetchData = async (fileName) => {
  try {
    const response = await axios.get(`/data/${fileName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${fileName}:`, error);
    throw error;
  }
};

// Função para obter a última posição de cada equipamento
export const getLatestPositions = (positionHistory) => {
  return positionHistory.map(equipment => {
    const positions = equipment.positions || [];
    // Ordenar as posições por data (mais recente primeiro)
    const sortedPositions = [...positions].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    return {
      equipmentId: equipment.equipmentId,
      latestPosition: sortedPositions.length > 0 ? sortedPositions[0] : null
    };
  });
};

// Função para obter o estado atual (mais recente) de cada equipamento
export const getLatestStates = (stateHistory) => {
  return stateHistory.map(equipment => {
    const states = equipment.states || [];
    // Ordenar os estados por data (mais recente primeiro)
    const sortedStates = [...states].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    return {
      equipmentId: equipment.equipmentId,
      latestState: sortedStates.length > 0 ? sortedStates[0] : null
    };
  });
};

// Função para calcular a produtividade do equipamento
export const calculateProductivity = (equipmentId, stateHistory, equipmentStates) => {
  const equipment = stateHistory.find(e => e.equipmentId === equipmentId);
  if (!equipment || !equipment.states) return 0;

  const operatingStateId = equipmentStates.find(state => state.name === 'Operando')?.id;
  if (!operatingStateId) return 0;

  // Filtering states within the last 24 hours
  const now = new Date();
  const oneDayAgo = new Date(now);
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  
  const recentStates = equipment.states.filter(
    state => new Date(state.date) >= oneDayAgo
  );
  
  // Count operating hours
  let operatingHours = 0;
  recentStates.forEach(state => {
    if (state.equipmentStateId === operatingStateId) {
      operatingHours += 1; // Assuming each state entry represents 1 hour
    }
  });
  
  // Calculate productivity percentage
  return (operatingHours / 24) * 100;
};

// Função para calcular o ganho do equipamento
export const calculateEarnings = (
  equipmentId, 
  stateHistory, 
  equipmentModels, 
  equipments
) => {
  const equipment = stateHistory.find(e => e.equipmentId === equipmentId);
  if (!equipment || !equipment.states) return 0;
  
  // Find equipment model
  const equipmentData = equipments.find(e => e.id === equipmentId);
  if (!equipmentData) return 0;
  
  const equipmentModel = equipmentModels.find(
    model => model.id === equipmentData.equipmentModelId
  );
  if (!equipmentModel || !equipmentModel.hourlyEarnings) return 0;
  
  // Calculate earnings based on state history
  let totalEarnings = 0;
  
  equipment.states.forEach(state => {
    const stateEarning = equipmentModel.hourlyEarnings.find(
      earning => earning.equipmentStateId === state.equipmentStateId
    );
    
    if (stateEarning) {
      totalEarnings += stateEarning.value;
    }
  });
  
  return totalEarnings;
}; 