import { useEffect } from 'react';
import { Position } from '../types/interface';
import useEquipmentStore from '../store/useEquipmentStore';

const useData = () => {
  const { setEquipment, setPositions, setStates, setModels, setStateHistory } =
    useEquipmentStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentResponse = await fetch('/data/equipment.json');
        const equipmentData = await equipmentResponse.json();
        setEquipment(equipmentData);

        const positionsResponse = await fetch(
          '/data/equipmentPositionHistory.json'
        );
        const positionsData = await positionsResponse.json();
        const positionsMap = positionsData.reduce(
          (
            acc: Record<string, Position[]>,
            item: { equipmentId: string; positions: Position[] }
          ) => {
            acc[item.equipmentId] = item.positions;
            return acc;
          },
          {}
        );
        setPositions(positionsMap);

        const statesResponse = await fetch('/data/equipmentState.json');
        const statesData = await statesResponse.json();
        const stateMap = statesData.reduce(
          (
            acc: Record<string, { id: string; name: string; color: string }>,
            state: { id: string; name: string; color: string }
          ) => {
            acc[state.id] = {
              id: state.id,
              name: state.name,
              color: state.color,
            };
            return acc;
          },
          {}
        );
        setStates(stateMap);

        const modelsResponse = await fetch('/data/equipmentModel.json');
        const modelsData = await modelsResponse.json();
        setModels(modelsData);

        const historyResponse = await fetch('/data/equipmentStateHistory.json');
        const historyData = await historyResponse.json();
        setStateHistory(historyData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, [setEquipment, setPositions, setStates, setModels, setStateHistory]);
};

export default useData;
