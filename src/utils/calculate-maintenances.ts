import { MaintenanceModel } from "@/types/equipment.type";

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRadians = (degree: number) => (degree * Math.PI) / 180;

  const R = 6371; // Earth Ray in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export function findNearestMaintenance(
  equipmentPosition: { lat: number; lon: number },
  maintenances: MaintenanceModel[],
) {
  if (maintenances.length === 0) return null;

  return maintenances.reduce((closest, current) => {
    const distanceToCurrent = calculateDistance(
      equipmentPosition.lat,
      equipmentPosition.lon,
      current.position.lat,
      current.position.lon,
    );

    const distanceToClosest = calculateDistance(
      equipmentPosition.lat,
      equipmentPosition.lon,
      closest.position.lat,
      closest.position.lon,
    );

    return distanceToCurrent < distanceToClosest ? current : closest;
  }, maintenances[0]);
}
