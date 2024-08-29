// src/data/loadData.js
import equipment from '../../data/equipment.json';
import equipmentModel from '../../data/equipmentModel.json';
import equipmentPositionHistory from '../../data/equipmentPositionHistory.json';
import equipmentState from '../../data/equipmentState.json';
import equipmentStateHistory from '../../data/equipmentStateHistory.json';

export const loadData = () => {
  return {
    equipment,
    equipmentModel,
    equipmentPositionHistory,
    equipmentState,
    equipmentStateHistory,
  };
};
