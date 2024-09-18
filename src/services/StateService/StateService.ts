import { IStateService, IStateData } from './IStateService';

export class StateService implements IStateService {
  private dataUrl = '/data/equipmentState.json';

  async fetchAllStates(): Promise<IStateData[]> {
    try {
      const response = await fetch(this.dataUrl);

      if (!response.ok) {
        throw new Error('Error fetching equipment states.');
      }

      const data: IStateData[] = await response.json();

      if (!data || data.length === 0) {
        console.warn('No equipment states available.');
        return [];
      }

      return data;
    } catch (error) {
      console.error('Error fetching equipment states:', error);
      return [];
    }
  }
}
