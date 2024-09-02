import Equipments from '../data/equipment.json';

export function getEquipmentName(equipmentId: string) {
  const [equipmentObj] = Equipments.filter(
    (equipment) => equipment.id === equipmentId,
  );
  return equipmentObj.name;
}
