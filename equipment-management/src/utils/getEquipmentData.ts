export const getEquipmentData = async () => {
    const response = await fetch('/data/equipment.json');
    const equipmentData = await response.json();
  
    const responseModel = await fetch('/data/equipmentModel.json');
    const equipmentModelData = await responseModel.json();
  
    const responsePosition = await fetch('/data/equipmentPositionHistory.json');
    const equipmentPositionHistoryData = await responsePosition.json();
  
    const responseState = await fetch('/data/equipmentState.json');
    const equipmentStateData = await responseState.json();
  
    const responseStateHistory = await fetch('/data/equipmentStateHistory.json');
    const equipmentStateHistoryData = await responseStateHistory.json();
  
    return { equipmentData, equipmentModelData, equipmentPositionHistoryData, equipmentStateData, equipmentStateHistoryData };
};
