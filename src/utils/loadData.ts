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

export const loadData = () => {
  const data = equipmentData.map((equipment) => {
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

    const positionHistoryObj = equipmentPositionHistoryData
      .find((position) => position.equipmentId === equipment.id)
      ?.positions.at(-1);

    return {
      id: equipment.id,
      name: equipment.name,
      model: model?.name,
      position: [
        positionHistoryObj?.lat ?? 0,
        positionHistoryObj?.lon ?? 0,
      ] as [number, number],
      state: state?.name,
      stateHistory,
    };
  });

  return data;
};
