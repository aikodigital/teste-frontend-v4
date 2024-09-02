import { getStateObj } from './getStateObj';
import EquipmentStateHistory from '../data/equipmentStateHistory.json';

export function getEquipmentCurrentState(equipmentId: string) {
  const [equipmentObj] = EquipmentStateHistory.filter((equipment) => {
    if (equipment.equipmentId === equipmentId) return equipment;
  });

  const stateObj = getStateObj(
    equipmentObj?.states[equipmentObj.states.length - 1].equipmentStateId,
  );

  return stateObj;
}
