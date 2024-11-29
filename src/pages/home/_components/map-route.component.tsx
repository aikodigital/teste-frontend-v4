import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { EquipmentPositionHistory } from "@/types/equipment.type";
import {
  createCustomIcon,
  createPostIcon,
} from "@/utils/create-map-icons.util";
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
          color="#d0d0d0"
          lineJoin="round"
          weight={2}
        />
      )}

      {routeCoordinates.length > 0 && (
        <>
          <Marker
            position={routeCoordinates[0]}
            icon={createCustomIcon({ typeMarker: "init", size: 20 })}
          >
            <Popup>
              <p>Partida</p>
            </Popup>
          </Marker>

          <Marker
            position={routeCoordinates[routeCoordinates.length - 1]}
            icon={createCustomIcon({ typeMarker: "current", size: 35 })}
            autoPan={true}
          >
            <Popup>
              <p>Equipamento está aqui</p>
            </Popup>
          </Marker>
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
