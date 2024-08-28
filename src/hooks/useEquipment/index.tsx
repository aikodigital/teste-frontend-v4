import { createContext, useContext, useState } from 'react';

import GarraTracadora from '@/assets/images/garra-tracadora.jpg';
import Harvester from '@/assets/images/harvester.jpg';
import CaminhaoCarga from '@/assets/images/caminhao-de-carga.jpg';

import { defaultEquipmentPositionHistory } from './constants';

import EquipmentJson from '@/data/equipment.json';
import EquipmentModelJson from '@/data/equipmentModel.json';
import EquipmentStateJson from '@/data/equipmentState.json';
import EquipmentPositionHistoryJson from '@/data/equipmentPositionHistory.json';
import EquipmentStateHistoryJson from '@/data/equipmentStateHistory.json';

import {
  EquipmentContextProps,
  EquipmentProviderProps,
  EquipmentPositionHistoryProps,
} from './models';

import { EquipmentState } from '@/@types';

const EquipmentContext = createContext<EquipmentContextProps>(
  {} as EquipmentContextProps
);

export const EquipmentProvider = ({ children }: EquipmentProviderProps) => {
  const [equipmentPositionHistory, setEquipmentPositionHistory] =
    useState<EquipmentPositionHistoryProps>(defaultEquipmentPositionHistory);

  const changeEquipmentPositionHistory: EquipmentContextProps['changeEquipmentPositionHistory'] =
    (props) => {
      setEquipmentPositionHistory(props);
    };

  const getEquipmentModelList: EquipmentContextProps['getEquipmentModelList'] =
    () => {
      return EquipmentModelJson;
    };

  const getEquipmentStateList: EquipmentContextProps['getEquipmentStateList'] =
    () => {
      return EquipmentStateJson.map(({ name, ...rest }) => ({
        ...rest,
        name: name as EquipmentState,
      }));
    };

  const getEquipmentModel: EquipmentContextProps['getEquipmentModel'] = (
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

  const getEquipmentState: EquipmentContextProps['getEquipmentState'] = (
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

  const getEquipmentList: EquipmentContextProps['getEquipmentList'] = () => {
    return EquipmentJson.map(({ equipmentModelId, ...rest }) => {
      return {
        ...rest,
        equipmentModel: getEquipmentModel(equipmentModelId),
      };
    });
  };

  const getEquipmentPositionHistory: EquipmentContextProps['getEquipmentPositionHistory'] =
    (equipmentId) => {
      if (!EquipmentJson.find((props) => props.id === equipmentId)) return;

      const equipmentPositionHistory = EquipmentPositionHistoryJson.find(
        (props) => props.equipmentId === equipmentId
      );

      if (!equipmentPositionHistory) return;

      return {
        ...equipmentPositionHistory,
        positions: equipmentPositionHistory.positions.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
      };
    };

  const getEquipmentStateHistory: EquipmentContextProps['getEquipmentStateHistory'] =
    (equipmentId) => {
      if (!EquipmentJson.find((props) => props.id === equipmentId)) return;

      const equipmentStateHistory = EquipmentStateHistoryJson.find(
        (props) => props.equipmentId === equipmentId
      );

      if (!equipmentStateHistory) return;

      return {
        ...equipmentStateHistory,
        states: equipmentStateHistory.states
          .map(({ equipmentStateId, ...rest }) => ({
            ...rest,
            equipmentState: getEquipmentState(equipmentStateId),
          }))
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          ),
      };
    };

  const getProductivity: EquipmentContextProps['getProductivity'] = ({
    equipmentId,
    hours,
  }) => {
    const history = getEquipmentStateHistory(equipmentId)?.states?.filter(
      ({ date }, _, arr) =>
        new Date(date).getTime() >=
        new Date(arr.at(-1)?.date ?? '').getTime() - 1000 * 60 * 60 * hours
    );

    if (!history)
      return {
        [EquipmentState.OPERATING]: 0,
        [EquipmentState.STOPPED]: 0,
        [EquipmentState.MAINTENANCE]: 0,
      };

    const productivity = history.reduce(
      (acc, { equipmentState, date }, i, arr) => {
        if (!equipmentState || i >= arr.length - 1) return acc;

        acc[equipmentState.name] +=
          (new Date(arr[i + 1]?.date).getTime() - new Date(date).getTime()) /
          1000 /
          60 /
          60; // hours

        return acc;
      },
      {
        [EquipmentState.OPERATING]: 0,
        [EquipmentState.STOPPED]: 0,
        [EquipmentState.MAINTENANCE]: 0,
      }
    );

    return productivity;
  };

  const getGain: EquipmentContextProps['getGain'] = ({
    equipmentModelId,
    productivity,
  }) => {
    const equipmentModel = getEquipmentModel(equipmentModelId);

    if (!equipmentModel) return 0;

    return equipmentModel.hourlyEarnings.reduce(
      (acc, { equipmentState, value }) => {
        if (!equipmentState) return acc;

        acc += productivity[equipmentState.name] * value;

        return acc;
      },
      0
    );
  };

  const getIcon: EquipmentContextProps['getIcon'] = ({ equipmentModelId }) => {
    switch (equipmentModelId) {
      case '9c3d009e-0d42-4a6e-9036-193e9bca3199':
        return GarraTracadora;
      case 'a4b0c114-acd8-4151-9449-7d12ab9bf40f':
        return Harvester;
      case 'a3540227-2f0e-4362-9517-92f41dabbfdf':
        return CaminhaoCarga;
      default:
        return '';
    }
  };

  return (
    <EquipmentContext.Provider
      value={{
        getEquipmentList,
        getEquipmentModelList,
        getEquipmentStateList,

        getEquipmentModel,
        getEquipmentState,
        getEquipmentPositionHistory,
        getEquipmentStateHistory,

        getIcon,
        getProductivity,
        getGain,

        equipmentPositionHistory,
        changeEquipmentPositionHistory,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => {
  return useContext(EquipmentContext);
};
