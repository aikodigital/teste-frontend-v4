import equipmentData from '../data/equipment.json';
import equipmentModelData from '../data/equipmentModel.json';
import equipmentPositionHistoryData from '../data/equipmentPositionHistory.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';

const stateMap = new Map(
  equipmentStateData.map((state) => [
    state.id,
    { name: state.name, color: state.color },
  ])
);

type LoadDataOptions = {
  model?: string;
  state?: string;
  getAllPositionHistory?: boolean;
};

export const loadData = (options?: LoadDataOptions) => {
  let filteredEquipments = equipmentData;

  if (options?.model) {
    filteredEquipments = filteredEquipments.filter(
      (equipment) => equipment.equipmentModelId === options.model
    );
  }

  const data = filteredEquipments.map((equipment) => {
    const model = equipmentModelData.find(
      (equipmentModel) => equipmentModel.id === equipment.equipmentModelId
    );

    const stateHistoryObj = equipmentStateHistoryData.find(
      (state) => state.equipmentId === equipment.id
    );

    const stateHistory = stateHistoryObj?.states.map((state) => ({
      date: state.date,
      state: stateMap.get(state.equipmentStateId)?.name,
      color: stateMap.get(state.equipmentStateId)?.color,
    }));

    const state = equipmentStateData.find(
      (equipmentState) =>
        equipmentState.id === stateHistoryObj?.states.at(-1)?.equipmentStateId
    );

    const allPositionHistoryObj = equipmentPositionHistoryData
      .find((position) => position.equipmentId === equipment.id)
      ?.positions.map((position) => [position.lat, position.lon]);

    const latestPosition = allPositionHistoryObj?.at(-1);

    return {
      id: equipment.id,
      name: equipment.name,
      model: model?.name,
      position: latestPosition as [number, number],
      positionHistory: allPositionHistoryObj as [number, number][],
      state: state?.name,
      stateHistory,
    };
  });

  if (options?.state) {
    return data.filter(
      (data) => data.state === stateMap.get(options.state ?? '')?.name
    );
  }

  return data;
};
