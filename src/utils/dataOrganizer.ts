import {
  Equipment,
  EquipmentModel,
  EquipmentPositionHistory,
  EquipmentState,
  EquipmentStateHistory,
  OrganizedEquipment,
} from '../types/types';

import fetchAndCalculateData from '../utils/calculate';

export const organizeData = (
  equipments: Equipment[],
  equipmentPositionHistories: EquipmentPositionHistory[],
  equipmentModels: EquipmentModel[],
  equipmentStates: EquipmentState[],
  equipmentStateHistories: EquipmentStateHistory[],
): OrganizedEquipment[] => {
  const equipmentModelsMap = new Map<string, EquipmentModel>();
  equipmentModels.forEach((model) => equipmentModelsMap.set(model.id, model));

  fetchAndCalculateData();

  const equipmentStatesMap = new Map<string, EquipmentState>();
  equipmentStates.forEach((state) => equipmentStatesMap.set(state.id, state));

  const equipmentMap = new Map<string, any>();
  equipments.forEach((equipment, index) => {
    const model = equipmentModelsMap.get(equipment.equipmentModelId);
    const positionHistory = equipmentPositionHistories.find(
      (history) => history.equipmentId === equipment.id,
    );
    const stateHistory = equipmentStateHistories.find(
      (history) => history.equipmentId === equipment.id,
    );

    if (model) {
      const hourlyEarnings = model.hourlyEarnings.map((earning) => ({
        ...earning,
        stateName: equipmentStatesMap.get(earning.equipmentStateId)?.name,
      }));

      const equipamenthourlyEarningsString = localStorage.getItem('item');

      let equipamenthourlyEarnings = [];

      if (equipamenthourlyEarningsString) {
        try {
          equipamenthourlyEarnings = JSON.parse(equipamenthourlyEarningsString);
        } catch (error) {
          console.error('Erro ao parsear equipamenthourlyEarnings:', error);
        }
      }

      const averageProductivity =
        equipamenthourlyEarnings[index]?.averageProductivityDay || null;

      const averageGain =
        equipamenthourlyEarnings[index]?.averageGainDay || null;

      equipmentMap.set(equipment.id, {
        ...equipment,
        modelName: model.name,
        hourlyEarnings,
        positions: positionHistory?.positions || [],
        states:
          stateHistory?.states.map((state) => ({
            ...state,
            stateName: equipmentStatesMap.get(state.equipmentStateId)?.name,
          })) || [],
        averageProductivity,
        averageGain,
      });
    }
  });

  return Array.from(equipmentMap.values());
};
