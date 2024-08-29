// src/components/mapUtils/mapUtils.js

import equipmentModel from '../../data/equipmentModel.json';
import equipmentPositionHistory from '../../data/equipmentPositionHistory.json';
import equipmentState from '../../data/equipmentState.json';
import equipmentStateHistory from '../../data/equipmentStateHistory.json';

export const getLatestPosition = (equipmentId) => {
  const positionHistory = equipmentPositionHistory.find(ph => ph.equipmentId === equipmentId);
  return positionHistory.positions[positionHistory.positions.length - 1];
};

export const getLatestState = (equipmentId) => {
  const stateHistory = equipmentStateHistory.find(sh => sh.equipmentId === equipmentId);
  const latestState = stateHistory.states[stateHistory.states.length - 1];
  return equipmentState.find(state => state.id === latestState.equipmentStateId);
};

export const getEquipmentModel = (equipmentModelId) => {
  return equipmentModel.find(model => model.id === equipmentModelId);
};

export const getMarkerIcon = (stateName) => {
  return stateName === 'Operando' ? '🔧' : stateName === 'Parado' ? '⛔' : '🛠️';
};

export const getStateHistory = (equipmentId) => {
  const stateHistory = equipmentStateHistory.find(sh => sh.equipmentId === equipmentId);
  return stateHistory.states.map(stateEntry => ({
    name: equipmentState.find(s => s.id === stateEntry.equipmentStateId).name,
    date: new Date(stateEntry.date).toLocaleString(),
  }));
};

export const calculateProductivity = (equipmentId) => {
  const stateHistory = equipmentStateHistory.find(sh => sh.equipmentId === equipmentId);
  const totalHours = 24; // Considerando um período de 24 horas
  let operatingHours = 0;

  stateHistory.states.forEach(stateEntry => {
    const state = equipmentState.find(s => s.id === stateEntry.equipmentStateId);
    if (state.name === 'Operando') {
      const startTime = new Date(stateEntry.date);
      const endTime = new Date(); // Assume que o cálculo é para o dia atual
      const duration = (endTime - startTime) / (1000 * 60 * 60); // Diferença em horas
      operatingHours += duration;
    }
  });

  return (operatingHours / totalHours) * 100;
};
