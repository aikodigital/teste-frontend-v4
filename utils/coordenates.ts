import type { Position } from "@dtos/EquipmentPositionHistory";

export function getCenter(equipmentsPosition: Position[]) {
  if (!equipmentsPosition?.length) return { lat: 0, lon: 0 };

  const sum = equipmentsPosition.reduce(
    (acc, pos) => {
      acc.lat += pos.lat;
      acc.lon += pos.lon;
      return acc;
    },
    { lat: 0, lon: 0 }
  );

  return {
    lat: sum.lat / equipmentsPosition.length,
    lon: sum.lon / equipmentsPosition.length
  };
};