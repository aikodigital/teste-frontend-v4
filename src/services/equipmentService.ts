import { Equipment, Position, EquipmentWithDetails, StateHistory, EquipmentStateType } from '../types';
import { getEquipmentModel } from './stateService';
import positionsData from '../data/equipmentPositionHistory.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import equipmentData from '../data/equipment.json';

export const fetchPositions = async (equipmentId: string): Promise<{ positions: Position[] }> => {
  return new Promise((resolve) => {
    const equipmentPositions = positionsData.find(
      (data) => data.equipmentId === equipmentId
    );
    setTimeout(() => resolve(equipmentPositions || { positions: [] }), 500);
  });
};

export const getLatestPosition = (positions: Position[]): Position => {
  
  return positions.reduce((latest, current) => {
    const currentDate = new Date(current.date);
    const latestDate = new Date(latest.date);
    return currentDate > latestDate ? current : latest;
  });
};

const getCurrentState = (equipmentId: string): EquipmentStateType => {
  const currentState = equipmentStateData.find(
    state => state.id === equipmentId
  );

  if (currentState) {
    return {
      id: currentState.id,
      name: currentState.name,
      color: currentState.color,
    };
  }

  throw new Error('Current state not found');
};

const getStateHistory = (equipmentId: string): StateHistory[] => {
  const history = equipmentStateHistoryData.find(
    history => history.equipmentId === equipmentId
  );
  
  if (history) {
    return history.states.map(state => ({
      equipmentStateId: state.equipmentStateId,
      date: state.date
    }));
  }
  return [];
};

export const getEquipmentWithDetails = async (equipment: Equipment): Promise<EquipmentWithDetails> => {

  // Busca o modelo do equipamento
  const model = getEquipmentModel(equipment.equipmentModelId);

  const lastModel = model.hourlyEarnings[0].equipmentStateId
  
  // Busca as posições do equipamento
  const positionData = await fetchPositions(equipment.id);
  const latestPosition = getLatestPosition(positionData.positions);
  
  // Busca o estado atual do equipamento
  const currentState = getCurrentState(lastModel);
  
  // Busca o histórico de estados do equipamento
  const stateHistory = getStateHistory(equipment.id);

  return {
    ...equipment,
    model,
    currentPosition: latestPosition,
    currentState,
    stateHistory
  };
};

export const fetchEquipments = async (): Promise<Equipment[]> => {
  return new Promise((resolve) => {
    const equipments: Equipment[] = equipmentData.map(equipment => ({
      id: equipment.id,
      equipmentModelId: equipment.equipmentModelId,
      name: equipment.name
    }));
    setTimeout(() => resolve(equipments), 500);
  });
};