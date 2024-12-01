import "leaflet-routing-machine";

declare module "leaflet-routing-machine" {
  interface RoutingControlOptions {
    createMarker?: (
      waypoint: L.LatLng,
      index: number,
      nWaypoints: number,
    ) => L.Marker | null;
  }
}
