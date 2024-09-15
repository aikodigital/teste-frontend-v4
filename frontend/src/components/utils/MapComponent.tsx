import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// add { LatLngExpression } t0 the import from leaflet

export const MapComponent = () => {
  // useEffect(() => {
  //   const trail = ride.value.data.map((position) => [
  //     position.latitude,
  //     position.longitude,
  //   ] as LatLngExpression);
  //   setRideTrail(trail);
  // }, [ride.value.data]);

  // useEffect(() => {
  //   if (rideTrail.length === 0) return;

  //   const map = L.map("map", {
  //     attributionControl: false,
  //   }).setView(rideTrail[0], 13);

  //   L.tileLayer(
  //     "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
  //     { minZoom: 5, maxZoom: 18 }
  //   ).addTo(map);

  //   const polyline = L.polyline(rideTrail, { color: "#f00" });
  //   polyline.addTo(map);

  //   return () => {
  //     map.remove();
  //   };
  // }, [rideTrail]);

  useEffect(() => {
    const map = L.map("map", {
      attributionControl: false,
      center: [51.505, -0.09],
      zoom: 13,
    });

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      { minZoom: 5, maxZoom: 18 }
    ).addTo(map);

    return () => {
      map.remove();
    };
  });

  return <div id="map" className="h-96"></div>;
};
