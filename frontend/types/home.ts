type Position = [number, number];

interface EquipmentHistory {
  state: string;
  color: string;
  positions: Position;
}

interface Equipment {
  _id: string;
  position: Position;
  popupText: string;
  color: string;
  equipmentType: string;
  state: string;
  history: EquipmentHistory[];
}
