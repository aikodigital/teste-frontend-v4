import { LatLngExpression } from 'leaflet';

export function getLastPositionPerEquipment(
  positionsArray: {
    date: string;
    lat: number;
    lon: number;
  }[],
) {
  return [
    positionsArray[positionsArray.length - 1].lat,
    positionsArray[positionsArray.length - 1].lon,
  ] as LatLngExpression;
}
