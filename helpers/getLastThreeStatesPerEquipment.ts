import EquipmentStateHistory from '../data/equipmentStateHistory.json';

export function getLastThreeStatesPerEquipment(equipmentId: string) {
  const [equipmentObj] = EquipmentStateHistory.filter((equipment) => {
    if (equipment.equipmentId === equipmentId) return equipment;
  });

  return equipmentObj.states.slice(-4, -1);
}
