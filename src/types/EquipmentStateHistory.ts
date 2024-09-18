interface StatesProps {
  date: Date;
  equipmentStateId: string;
  id: string;
  name: string;
  color: string;
}

export interface EquipmentStateHistoryProps {
  equipmentId: string;
  states: StatesProps[];
}

