export interface IModelService {
  fetchAllModels(): Promise<IModelData[]>;
}

export interface IModelData {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarnings[];
}

export interface HourlyEarnings {
  equipmentStateId: string;
  value: number;
}
