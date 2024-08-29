import { useEffect } from 'react';
import {
  Position,
  Equipment,
  EquipmentState,
  EquipmentModel,
  EquipmentStateHistory,
  EquipmentPositionHistory,
} from '../types/interface';
import useEquipmentStore from '../store/useEquipmentStore';

const transformPositions = (positions: EquipmentPositionHistory[]) =>
  positions.reduce((acc: Record<string, Position[]>, item) => {
    acc[item.equipmentId] = item.positions;
    return acc;
  }, {});

const transformStates = (states: EquipmentState[]) =>
  states.reduce((acc: Record<string, EquipmentState>, state) => {
    acc[state.id] = state;
    return acc;
  }, {});

const fetchData = async <T, U>(
  url: string,
  transformer?: (data: T) => U
): Promise<U> => {
  const response = await fetch(url);
  const data: T = await response.json();
  return transformer ? transformer(data) : (data as unknown as U);
};

const useData = () => {
  const { setEquipment, setPositions, setStates, setModels, setStateHistory } =
    useEquipmentStore();

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [
          equipmentData,
          positionsData,
          statesData,
          modelsData,
          historyData,
        ] = await Promise.all([
          fetchData<Equipment[], Equipment[]>('/data/equipment.json'),
          fetchData<EquipmentPositionHistory[], Record<string, Position[]>>(
            '/data/equipmentPositionHistory.json',
            transformPositions
          ),
          fetchData<EquipmentState[], Record<string, EquipmentState>>(
            '/data/equipmentState.json',
            transformStates
          ),
          fetchData<EquipmentModel[], EquipmentModel[]>(
            '/data/equipmentModel.json'
          ),
          fetchData<EquipmentStateHistory[], EquipmentStateHistory[]>(
            '/data/equipmentStateHistory.json'
          ),
        ]);

        setEquipment(equipmentData);
        setPositions(positionsData);
        setStates(statesData);
        setModels(modelsData);
        setStateHistory(historyData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    loadAllData();
  }, [setEquipment, setPositions, setStates, setModels, setStateHistory]);
};

export default useData;
