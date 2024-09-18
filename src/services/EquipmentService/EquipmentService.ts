import { IEquipmentService, EquipmentData } from './IEquipmentService';

export class EquipmentService implements IEquipmentService {
  private dataUrl = '/data/equipment.json'; // URL da API ou do arquivo JSON

  async fetchAllEquipmentData(): Promise<EquipmentData[]> {
    try {
      const response = await fetch(this.dataUrl);

      if (!response.ok) {
        throw new Error('Erro ao carregar dados do arquivo JSON.');
      }

      const data: EquipmentData[] = await response.json();

      if (!data || data.length === 0) {
        console.warn('Não há equipamentos disponíveis.');
        return [];
      }
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados do equipamento:', error);
      return [];
    }
  }
}
