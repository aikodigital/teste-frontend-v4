export interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

interface HourlyEarning {
  equipmentStateId: string;
  value: number;
}

export interface Model {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarning[];
}

export interface State {
  id: string;
  name: string;
  color: string;
}
