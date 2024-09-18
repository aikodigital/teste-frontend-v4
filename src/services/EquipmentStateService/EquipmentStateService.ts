import { getMostRecentState } from '../../utils/getMostRecentState';
import {
  IEquipmentState,
  IEquipmentStateHistory,
  IEquipmentStateService,
} from './IEquipmentStateService';

export class EquipmentStateService implements IEquipmentStateService {
  private dataUrl = '/data/equipmentStateHistory.json'; // URL da API ou do arquivo JSON

  async fetchAllEquipmentState(): Promise<IEquipmentState[]> {
    try {
      const response = await fetch(this.dataUrl);

      if (!response.ok) {
        throw new Error('Erro ao carregar dados do arquivo JSON.');
      }

      const data: IEquipmentStateHistory[] = await response.json();

      if (!data || data.length === 0) {
        console.warn('Não há equipamentos disponíveis.');
        return [];
      }
      const normalizeData: IEquipmentState[] = data.map((e) => {
        return {
          equipmentId: e.equipmentId,
          state: getMostRecentState(e.states),
        };
      });

      return normalizeData;
    } catch (error) {
      console.error('Erro ao buscar dados do equipamento:', error);
      return [];
    }
  }

  async fetchEquipmentState(
    equipmentId: string
  ): Promise<IEquipmentStateHistory | null> {
    try {
      const response = await fetch(this.dataUrl);

      if (!response.ok) {
        throw new Error('Erro ao carregar dados do arquivo JSON.');
      }

      const data: IEquipmentStateHistory[] = await response.json();

      if (!data || data.length === 0) {
        console.warn('Não há equipamentos disponíveis.');
        return null;
      }

      const equipment = data.findLast((e) => e.equipmentId === equipmentId);

      return equipment ?? null;
    } catch (error) {
      console.error('Erro ao buscar dados do equipamento:', error);
      return null;
    }
  }
}
