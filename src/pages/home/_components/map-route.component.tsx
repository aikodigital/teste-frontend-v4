import { MapContainer, Marker, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon, LatLngExpression } from "leaflet";
import { EquipmentPositionHistory } from "@/types/equipment.type";

interface MapRouteProps {
  positionHistory: EquipmentPositionHistory | undefined;
  model: string;
}
export function MapRouteComponent({ positionHistory, model }: MapRouteProps) {
  if (!positionHistory) return null;

  const positionDefault: LatLngExpression =
    positionHistory.positions.length > 0
      ? [positionHistory.positions[0].lat, positionHistory.positions[0].lon]
      : [-19.264235, -46.092436];

  const routeCoordinates: LatLngExpression[] = positionHistory.positions.map(
    (position) => [position.lat, position.lon],
  );

  const createCustomIcon = (model: string) => {
    const image =
      model == "Harvester"
        ? "/icons/harvester.png"
        : model == "Garra traçadora"
          ? "/icons/garra-tracadora.png"
          : "/icons/caminhao-de-carga.png";

    return icon({
      iconUrl: image,
      iconSize: [50, 50],
      iconAnchor: [15, 15], // point of the image that will be aligned with the marker position
      popupAnchor: [0, -15], // Where the popup will be displayed, in relation to the icon
    });
  };

  return (
    <MapContainer
      center={positionDefault}
      zoom={12}
      zoomControl={false}
      className="z-10"
    >
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {routeCoordinates.length > 1 && (
        <Polyline
          positions={routeCoordinates}
          color="#8c8c8c"
          lineJoin="bevel"
          weight={2}
          dashArray="5, 10"
          className="polyline-border"
        />
      )}

      {routeCoordinates.length > 0 && (
        <>
          <Marker
            position={routeCoordinates[0]}
            title="Início"
            icon={createCustomIcon(model ?? "Caminhão de carga")}
          />

          <Marker
            position={routeCoordinates[routeCoordinates.length - 1]}
            title="Fim"
            icon={createCustomIcon(model ?? "Caminhão de carga")}
          />
        </>
      )}
    </MapContainer>
  );
}
