import getData from "./getDataFromFile";

export const formatPositionData = async function (filePath) {
  const positionHistory = await getData(filePath);

  const lastPositions = positionHistory.map((history) => {
    const positions = history.positions;
    const lastPosition = positions[positions.length - 1];

    return (
      { equipmentId: history.equipmentId,
        lastLat: lastPosition.lat,
        lastLon: lastPosition.lon,
      }
    )
  });

  return lastPositions;
}

export default formatPositionData;