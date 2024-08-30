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
  getLatestLocations as getEquipmentLatestLocations,
} from '@/utils/equipment/equipmentPositionUtils';
import { IPositions } from '../../@types/equipment';

function useEquipment() {
  const getInfo = useCallback((equipmentId: string) => {
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
  }, []);

  const getLatestLocations = useCallback(
    (model = 'all', state = 'all', equipment = '') => {
      const positions = getEquipmentLatestLocations();

      const filteredPositions = positions
        .map((position) => {
          const equipmentInfo = getInfo(position.equipmentId);
          if (!equipmentInfo) return false;

          const matchesModel =
            model === 'all' || equipmentInfo.modelName === model;

          const matchesState =
            state === 'all' || equipmentInfo.state.name === state;

          const matchesEquipment =
            equipment === '' || equipment === equipmentInfo.name;

          if (matchesModel && matchesState && matchesEquipment) {
            return {
              ...position,
              modelName: equipmentInfo.modelName,
            };
          }
          return null;
        })
        .filter(
          (
            item,
          ): item is {
            modelName: string;
            position: IPositions;
            equipmentId: string;
          } => item !== null,
        );

      return filteredPositions;
    },
    [getInfo],
  );

  const getStateHistory = useCallback((equipmentId: string) => {
    const stateHistory = getEquipmentStateHistory(equipmentId);
    return stateHistory;
  }, []);

  const getPositionHistory = useCallback((equipmentId: string) => {
    const positionHistory = getEquipmentPositionHistory(equipmentId);
    return positionHistory;
  }, []);

  const getModels = useCallback(() => {
    const modelsList = getEquipmentModels();
    return modelsList;
  }, []);

  const getStates = useCallback(() => {
    const statesList = getEquipmentStates();
    return statesList;
  }, []);

  return {
    getLatestLocations,
    getInfo,
    getStateHistory,
    getPositionHistory,
    getModels,
    getStates,
  };
}

export { useEquipment };
