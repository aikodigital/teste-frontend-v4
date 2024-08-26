import EquipmentJson from '@/data/equipment.json';
import EquipmentModelJson from '@/data/equipmentModel.json';
import EquipmentStateJson from '@/data/equipmentState.json';
import EquipmentPositionHistoryJson from '@/data/equipmentPositionHistory.json';
import EquipmentStateHistoryJson from '@/data/equipmentStateHistory.json';

import { IUseProcessData } from './models';
import { EquipmentState } from '@/@types';

export const useProcessData = () => {
  const getEquipmentModel: IUseProcessData['getEquipmentModel'] = (
    equipmentModelId
  ) => {
    const equipmentModel = EquipmentModelJson.find(
      ({ id }) => id === equipmentModelId
    );

    if (!equipmentModel) return;

    return {
      ...equipmentModel,
      hourlyEarnings: equipmentModel.hourlyEarnings.map(
        ({ equipmentStateId, value }) => ({
          equipmentState: getEquipmentState(equipmentStateId),
          value,
        })
      ),
    };
  };

  const getEquipmentState: IUseProcessData['getEquipmentState'] = (
    equipmentStateId
  ) => {
    const equipmentState = EquipmentStateJson.find(
      ({ id }) => id === equipmentStateId
    );

    if (!equipmentState) return;

    return {
      ...equipmentState,
      name: equipmentState.name as EquipmentState,
    };
  };

  const getEquipmentList: IUseProcessData['getEquipmentList'] = () => {
    return EquipmentJson.map(({ equipmentModelId, ...rest }) => {
      return {
        ...rest,
        equipmentModel: getEquipmentModel(equipmentModelId),
      };
    });
  };

  const getEquipmentPositionHistory: IUseProcessData['getEquipmentPositionHistory'] =
    (equipmentId) => {
      if (!EquipmentJson.find((props) => props.id === equipmentId)) return;

      return EquipmentPositionHistoryJson.find(
        (props) => props.equipmentId === equipmentId
      );
    };

  const getEquipmentStateHistory: IUseProcessData['getEquipmentStateHistory'] =
    (equipmentId) => {
      if (!EquipmentJson.find((props) => props.id === equipmentId)) return;

      const equipmentStateHistory = EquipmentStateHistoryJson.find(
        (props) => props.equipmentId === equipmentId
      );

      if (!equipmentStateHistory) return;

      return {
        ...equipmentStateHistory,
        states: equipmentStateHistory.states.map(
          ({ equipmentStateId, ...rest }) => ({
            ...rest,
            equipmentState: getEquipmentState(equipmentStateId),
          })
        ),
      };
    };

  return {
    getEquipmentList,
    getEquipmentModel,
    getEquipmentState,
    getEquipmentPositionHistory,
    getEquipmentStateHistory,
  };
};
