import { getMostRecentPosition } from '../../utils/getMostRecentPosition';
import {
  IEquipmentPosition,
  IEquipmentPositionHistory,
  IEquipmentPositionService,
} from './IPositionService';

export class EquipmentPositionService implements IEquipmentPositionService {
  private positionHistoryUrl = '/data/equipmentPositionHistory.json';

  async fetchAllEquipmentsPositions(): Promise<IEquipmentPosition[]> {
    try {
      const response = await fetch(this.positionHistoryUrl);
      if (!response.ok) {
        throw new Error('Erro ao carregar histórico de posições.');
      }
      const data: IEquipmentPositionHistory[] = await response.json();

      const normalizeData: IEquipmentPosition[] = data.map((e) => {
        return {
          equipmentId: e.equipmentId,
          position: getMostRecentPosition(e.positions),
        };
      });

      return normalizeData;
    } catch (error) {
      console.error('Erro ao buscar histórico de posições:', error);
      return [];
    }
  }

  async fetchEquipmentPosition(
    equipmentId: string
  ): Promise<IEquipmentPositionHistory | null> {
    try {
      const response = await fetch(this.positionHistoryUrl);

      if (!response.ok) {
        throw new Error('Erro ao carregar dados do arquivo JSON.');
      }

      const data: IEquipmentPositionHistory[] = await response.json();

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
