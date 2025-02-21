import equipmentData from '../data/equipment.json';
import equipmentModel from '../data/equipmentModel.json';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipmentState from '../data/equipmentState.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';

export function getEquipmentData() {
  return equipmentData;
}

export function getEquipmentModels() {
  return equipmentModel;
}

export function getEquipmentPositions() {
  return equipmentPositionHistory.map((item) => {
    const equip = equipmentData.find((e) => e.id === item.equipmentId);
    return {
      ...item,
      name: equip ? equip.name : 'Sem nome',
    };
  });
}

export function getEquipmentStates() {
  return equipmentState;
}

export function getEquipmentStateHistory() {
  return equipmentStateHistory;
}
