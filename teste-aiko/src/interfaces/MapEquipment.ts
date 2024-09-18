import { LatLngExpression } from "leaflet";

export interface MapEquipmentInterface {
    equipmentId?: string,
    lastPosition?: number[],
    currentState?: string
}