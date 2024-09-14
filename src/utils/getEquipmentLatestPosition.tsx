import { LatLngExpression } from "leaflet";

export function getEquipmentLatestPosition(
	positions: {
		date: string;
		lat: number;
		lon: number;
	}[],
) {
	return [
		positions[positions.length - 1].lat,
		positions[positions.length - 1].lon,
	] as LatLngExpression;
}
