interface HourlyEarnings {
  equipmentStateId: string;
  value: number;
}

export interface Truck {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarnings[];
}
