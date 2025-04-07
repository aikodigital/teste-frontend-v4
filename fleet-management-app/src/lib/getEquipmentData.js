import getPositionData from "./getPositionData";
import getStateData from "./getStateData";

export const getEquipmentData = async function ({ positionHistoryFilePath, stateHistoryFilePath }) {
  const positionData = await getPositionData(positionHistoryFilePath);
  const stateData = await getStateData(stateHistoryFilePath);

  const equipmentData = positionData.map((position) => {
    const equipmentState = stateData.find((state) => state.equipmentId === position.equipmentId);

    return (
      {
        lastPosition: position,
        lastState: equipmentState.lastState,
        stateHistory: equipmentState.stateHistory,
      }
    )
  });

  return equipmentData;
}

export default getEquipmentData;