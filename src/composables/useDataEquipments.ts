import { ref, onMounted } from 'vue';
import type { IEquipment } from '@/types/equipment';
import type { IEquipmentModel } from '@/types/equipmentModel';
import type { IEquipmentPositionHistory } from '@/types/equipmentPositionHistory';
import type { IEquipmentState } from '@/types/equipmentState';
import type { IEquipmentStateHistory, IHistoryStateResponse, State } from '@/types/equipmentStateHistory';

import * as DataService from '@/services/dataService'
import { IPositionItem } from '@/types/positionList';
import { getLastRegister } from '@/utils/helpers';

const loading = ref<boolean>(true);
const equipments = ref<IEquipment[]>([])
const equipmentModels = ref<IEquipmentModel[]>([])
const equipmentPositionHistory = ref<IEquipmentPositionHistory[]>([])
const equipmentStates = ref<IEquipmentState[]>([])
const equipmentStateHistory = ref<IEquipmentStateHistory[]>([])

export function useDataEquipments() {

  function getDataEquipment(equipmentId: string) {
    const equipmentItem = equipments.value.find(equip => equip.id === equipmentId)
    const equipmentModel = equipmentModels.value.find(model => model.id === equipmentItem?.equipmentModelId)
    const equipmentState = equipmentStateHistory.value.find(state => state.equipmentId === equipmentId)
    const currentState: any = getLastRegister(equipmentState?.states!)
    const ItemState = equipmentStates.value.find(state => state.id === currentState?.equipmentStateId!)

    const equipment = {
      name: equipmentItem?.name,
      modelName: equipmentModel?.name,
      equipmentModelId: equipmentModel?.id,
      id: equipmentItem?.id,
      currentState: { ...ItemState, date: currentState.date }
    }
    return equipment
  }

  function getHistoryStateEquipment(
    equipmentId: string,
    page: number,
    limit: number,
    sort: 'ASC' | 'DESC'
  ): IHistoryStateResponse {
    const equipmentState = equipmentStateHistory.value.find(
      (state) => state.equipmentId === equipmentId
    );

    if (!equipmentState) {
      return {
        equipment: {
          name: '',
          modelName: '',
        }, items: [], total: 0
      };
    }

    const equipmentItem = getDataEquipment(equipmentState.equipmentId)

    // Ordenação baseada no valor do parâmetro `sort`
    const sortedHistory = equipmentState.states.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (sort === 'ASC') {
        return dateA - dateB; // Ordenação crescente
      } else {
        return dateB - dateA; // Ordenação decrescente
      }
    });

    const totalItems = sortedHistory.length;

    const startIndex = (page - 1) * limit;
    const paginatedItems = sortedHistory.slice(startIndex, startIndex + limit);

    const items = paginatedItems.map((item) => {
      const state = equipmentStates.value.find(
        (s) => s.id === item.equipmentStateId
      );
      return {
        date: item.date,
        stateName: state?.name || 'Unknown State',
        stateColor: state?.color || '#ddde',
      };
    });
    return { equipment: { name: equipmentItem?.name || '', modelName: equipmentItem?.modelName || '' }, items, total: totalItems };
  }

  function getEquipmentsPositions(): IPositionItem[] {
    return equipmentPositionHistory.value.map(pos => {
      const equipmentItem = getDataEquipment(pos.equipmentId)
      const position = {
        equipment: equipmentItem,
        position: getLastRegister(pos.positions) as any,
      }
      return position as IPositionItem
    })
  }

  async function loadEquipments() {
    try {
      const res = await DataService.getEquipments();
      equipments.value = res;
    } catch (error) {
      console.error('Failed to load equipments:', error);
    }
  }

  async function loadEquipmentModels() {
    try {
      const res = await DataService.getEquipmentModels();
      equipmentModels.value = res;
    } catch (error) {
      console.error('Failed to load equipment models:', error);
    }
  }

  async function loadEquipmentPositionHistory() {
    try {
      const res = await DataService.getEquipmentPositionHistory();
      equipmentPositionHistory.value = res;
    } catch (error) {
      console.error('Failed to load equipment position history:', error);
    }
  }

  async function loadEquipmentStates() {
    try {
      const res = await DataService.getEquipmentState();
      equipmentStates.value = res;
    } catch (error) {
      console.error('Failed to load equipment states:', error);
    }
  }

  async function loadEquipmentStateHistory() {
    try {
      const res = await DataService.getEquipmentStateHistory();
      equipmentStateHistory.value = res;
    } catch (error) {
      console.error('Failed to load equipment state history:', error);
    }
  }

  async function loadStates() {
    try {
      loading.value = true;

      await Promise.all([
        loadEquipments(),
        loadEquipmentModels(),
        loadEquipmentPositionHistory(),
        loadEquipmentStates(),
        loadEquipmentStateHistory()
      ]);
    } catch (error) {
      console.error('Failed to load all states:', error);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    equipments,
    equipmentModels,
    equipmentPositionHistory,
    equipmentStates,
    equipmentStateHistory,
    getEquipmentsPositions,
    loadStates,
    getHistoryStateEquipment
  };
}
