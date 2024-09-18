export interface IStateService {
  fetchAllStates(): Promise<IStateData[]>;
}

export interface IStateData {
  id: string;
  name: string;
  color: string;
}
