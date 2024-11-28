import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon, LatLngExpression } from "leaflet";
import { EquipmentPositionHistory } from "@/types/equipment.type";
import { createPostIcon } from "@/utils/create-map-icons";
import { useMaintenanceData } from "@/hooks/use-maintenance.hook";

interface MapRouteProps {
  positionHistory: EquipmentPositionHistory | undefined;
  model: string;
}
export function MapRouteComponent({ positionHistory }: MapRouteProps) {
  if (!positionHistory) return null;
  const { maintenances } = useMaintenanceData();

  const positionDefault: LatLngExpression =
    positionHistory.positions.length > 0
      ? [positionHistory.positions[0].lat, positionHistory.positions[0].lon]
      : [-19.264235, -46.092436];

  const routeCoordinates: LatLngExpression[] = positionHistory.positions.map(
    (position) => [position.lat, position.lon],
  );

  const createCustomIcon = (type: "init" | "current") => {
    const iconMarker =
      type === "current"
        ? "/icons/current-location.png"
        : "/icons/init-location.png";

    return icon({
      iconUrl: iconMarker,
      iconSize: [30, 30],
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
          lineJoin="round"
          weight={2}
          dashArray="5, 10"
        />
      )}

      {routeCoordinates.length > 0 && (
        <>
          <Marker
            position={routeCoordinates[0]}
            title="Início"
            icon={createCustomIcon("init")}
          />

          <Marker
            position={routeCoordinates[routeCoordinates.length - 1]}
            title="Fim"
            icon={createCustomIcon("current")}
          />
        </>
      )}

      {maintenances.map((post, postIndex) => (
        <Marker
          key={`${postIndex}-${post.id}`}
          position={[post.position.lat, post.position.lon]}
          icon={createPostIcon()}
          eventHandlers={{
            mouseover: (e) => {
              const marker = e.target;
              marker.openPopup();
            },
            mouseout: (e) => {
              const marker = e.target;
              marker.closePopup();
            },
          }}
        >
          <Popup>
            <p>
              <strong>Nome:</strong> {post.name}
            </p>
            <p>
              <strong>Posição:</strong> [{post.position.lat},{" "}
              {post.position.lon}]
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
