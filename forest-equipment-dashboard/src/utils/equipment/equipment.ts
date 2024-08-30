import { IEquipment } from '../../../@types/equipment';
import equipmentJson from '../../../data/equipment.json';

const equipment = equipmentJson as IEquipment[];

function getEquipmentById(equipmentId: string) {
  return equipment.find((equipment) => equipment.id === equipmentId);
}

export { getEquipmentById };
