interface Equipment {
  id: string;
  name: string;
  equipmentModel: EquipmentModel | null;
  positions: Position[];
  states: EquipmentStateHistory[];
}

interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarnings[];
}

interface HourlyEarnings {
  equipmentState: EquipmentState;
  value: number;
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface Position {
  date: string;
  lat: number;
  lon: number;
}

interface EquipmentStateHistory {
  date: string;
  equipmentState: EquipmentState;
}
