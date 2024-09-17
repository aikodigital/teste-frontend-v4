export const fetchData = async () => {
  try {
    const equipmentResponse = await fetch('/data/equipment.json');
    const equipmentData = await equipmentResponse.json();

    const equipmentStateResponse = await fetch('/data/equipmentState.json'); 
    const equipmentStateData = await equipmentStateResponse.json();

    const equipmentStateHistoryResponse = await fetch('/data/equipmentStateHistory.json');
    const equipmentStateHistoryData = await equipmentStateHistoryResponse.json();
    
    const equipmentPositionHistoryResponse = await fetch('/data/equipmentPositionHistory.json');
    const equipmentPositionHistoryData = await equipmentPositionHistoryResponse.json();
    
    const equipmentModelResponse = await fetch('/data/equipmentModel.json');
    const equipmentModelData = await equipmentModelResponse.json();
    
    return {
      equipment: equipmentData,
      equipmentState: equipmentStateData,
      equipmentStateHistory: equipmentStateHistoryData,
      equipmentPositionHistory: equipmentPositionHistoryData,
      equipmentModel: equipmentModelData
    };
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error; 
  }
};
