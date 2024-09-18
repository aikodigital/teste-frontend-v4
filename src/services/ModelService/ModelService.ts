import { IModelService, IModelData } from './IModelService';

export class ModelService implements IModelService {
  private dataUrl = '/data/equipmentModel.json';

  async fetchAllModels(): Promise<IModelData[]> {
    try {
      const response = await fetch(this.dataUrl);

      if (!response.ok) {
        throw new Error('Error fetching equipment models.');
      }

      const data: IModelData[] = await response.json();

      if (!data || data.length === 0) {
        console.warn('No equipment models available.');
        return [];
      }

      return data;
    } catch (error) {
      console.error('Error fetching equipment models:', error);
      return [];
    }
  }
}
