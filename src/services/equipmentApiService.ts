import equipmentsMock from '@data/equipment.json';
import equipmentModelsMock from '@data/equipmentModel.json';
import equipmentPositionHistoryMock from '@data/equipmentPositionHistory.json';
import equipmentStateMock from '@data/equipmentState.json';
import equipmentStateHistoryMock from '@data/equipmentStateHistory.json';

import type {
  EquipmentFromAPI,
  EquipmentModelFromAPI,
  EquipmentPositionHistoryFromAPI,
  EquipmentStateFromAPI,
  EquipmentStateHistoryFromAPI
} from '@/services/types';
import { arrayToObj } from '@/shared/helpers';

const equipmentsApiService = {
  getEquipments: async (): Promise<Record<string, EquipmentFromAPI>> => {
    const response = arrayToObj(equipmentsMock, 'id');

    return Promise.resolve(response);
  },

  getEquipmentModels: async (): Promise<Record<string, EquipmentModelFromAPI>> => {
    const response = arrayToObj(equipmentModelsMock, 'id');

    return Promise.resolve(response);
  },

  getEquipmentPositionHistory: async (): Promise<
    Record<string, EquipmentPositionHistoryFromAPI>
  > => {
    const response = arrayToObj(equipmentPositionHistoryMock, 'equipmentId');

    return Promise.resolve(response);
  },

  getEquipmentState: async (): Promise<EquipmentStateFromAPI[]> => {
    const response = equipmentStateMock as EquipmentStateFromAPI[];

    return Promise.resolve(response);
  },

  getEquipmentStateHistory: async (): Promise<Record<string, EquipmentStateHistoryFromAPI>> => {
    const response = arrayToObj(equipmentStateHistoryMock, 'equipmentId');

    return Promise.resolve(response);
  }
};

export { equipmentsApiService };
