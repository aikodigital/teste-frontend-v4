import equipmentPositionHistory from '../data/equipmentPositionHistory.json';

export default function EquipmentsLocation() {
  const getLatestPosition = (positions) => {
    const lastPosition = positions.reduce((acc, curr) => {
      return new Date(acc.date) > new Date(curr.date) ? acc : curr;
    });
    return{
      ...lastPosition,
      lng: lastPosition.lon,
    }
  };

  const latestPosiotions = equipmentPositionHistory.map(equipment => ({
    ...getLatestPosition(equipment.positions),
    equipmentId: equipment.equipmentId,
  }));

  return latestPosiotions;
}
