import { IEquipmentsPositionHistory } from '../../../@types/equipment';
import equipmentPositionHistoryJson from '../../../data/equipmentPositionHistory.json';

const equipmentPositionHistory =
  equipmentPositionHistoryJson as IEquipmentsPositionHistory[];

function getLatestLocations() {
  const positions = equipmentPositionHistory.map((equip) => {
    const lastPositionEntry = equip.positions[equip.positions.length - 1];

    return {
      position: lastPositionEntry,
      equipmentId: equip.equipmentId,
    };
  });

  return positions;
}

function getEquipmentPositionHistory(equipmentId: string) {
  const positionHistory = equipmentPositionHistory.find(
    (history) => history.equipmentId === equipmentId,
  );

  return positionHistory;
}

export { getLatestLocations, getEquipmentPositionHistory };
