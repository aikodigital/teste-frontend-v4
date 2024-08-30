import { useCallback } from 'react';
import { getEquipmentById } from '@/utils/equipment/equipment';
import {
  getEquipmentLatestState,
  getStateHistory as getEquipmentStateHistory,
  getStates as getEquipmentStates,
  getGainPerEquipment,
  getProductivityPercentage,
} from '@/utils/equipment/equipmentStateUtils';
import {
  getModelById,
  getModels as getEquipmentModels,
} from '@/utils/equipment/equipmentModel';
import {
  getEquipmentPositionHistory,
  getLatestLocations,
} from '@/utils/equipment/equipmentPositionUtils';

function useEquipment() {
  const getEquipmentInfo = useCallback(
    (equipmentId: string) => {
      const equipmentData = getEquipmentById(equipmentId);
      const equipmentStateData = getEquipmentLatestState(equipmentId);
      const equipmentModelData = getModelById(
        equipmentData?.equipmentModelId ?? '',
      );
      const productivityPercentage = getProductivityPercentage(equipmentId);
      const gain = getGainPerEquipment(equipmentId);

      return {
        name: equipmentData?.name,
        modelName: equipmentModelData?.name,
        state: {
          name: equipmentStateData?.name,
          color: equipmentStateData?.color,
        },
        productivityPercentage,
        gain,
      };
    },
    [
      getEquipmentById,
      getEquipmentLatestState,
      getModelById,
      getProductivityPercentage,
      getGainPerEquipment,
    ],
  );

  const getEquipmentLastPosition = useCallback(
    (model = 'all', state = 'all', equipment = '') => {
      const positions = getLatestLocations();

      const filteredPositions = positions.filter(({ equipmentId }) => {
        const equipmentInfo = getEquipmentInfo(equipmentId);
        if (!equipmentInfo) return false;

        const matchesModel =
          model === 'all' || equipmentInfo.modelName === model;

        const matchesState =
          state === 'all' || equipmentInfo.state.name === state;

        const matchesEquipment =
          equipment === '' || equipment === equipmentInfo.name;

        return matchesModel && matchesState && matchesEquipment;
      });

      return filteredPositions;
    },
    [getLatestLocations, getEquipmentInfo],
  );

  const getStateHistory = useCallback(
    (equipmentId: string) => {
      const stateHistory = getEquipmentStateHistory(equipmentId);
      return stateHistory;
    },
    [getEquipmentStateHistory],
  );

  const getPositionHistory = useCallback(
    (equipmentId: string) => {
      const positionHistory = getEquipmentPositionHistory(equipmentId);
      return positionHistory;
    },
    [getEquipmentPositionHistory],
  );

  const getModels = useCallback(() => {
    const modelsList = getEquipmentModels();
    return modelsList;
  }, [getEquipmentModels]);

  const getStates = useCallback(() => {
    const statesList = getEquipmentStates();
    return statesList;
  }, [getEquipmentStates]);

  return {
    getEquipmentLastPosition,
    getEquipmentInfo,
    getStateHistory,
    getPositionHistory,
    getModels,
    getStates,
  };
}

export default useEquipment;
