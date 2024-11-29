import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { useEquipmentStore } from "@/stores/equipment.store";
import { StatusBadge } from "../../../components/status-badge.component";
import { useAllData } from "@/hooks/use-all-data/use-all-data.hook";
import { useFilteredEquipmentData } from "@/hooks/use-filtered-data/use-filtered-data.hook";
import { useMaintenanceData } from "@/hooks/use-maintenance.hook";
import {
  createCustomIcon,
  createPostIcon,
} from "@/utils/create-map-icons.util";

export function MapComponent() {
  const positionDefault: LatLngExpression = [-19.264235, -46.092436];
  const openSheet = useEquipmentStore((state) => state.openSheet);
  const { allData } = useAllData();
  const { filteredData } = useFilteredEquipmentData(allData);
  const { maintenances } = useMaintenanceData();

  return (
    <MapContainer
      center={positionDefault}
      zoom={11}
      zoomControl={false}
      className="z-10"
    >
      <ZoomControl position="topright" />
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredData.map((equipment, eqIndex) => (
        <Marker
          key={`${eqIndex}-${equipment.id}`}
          position={[equipment.position.lat, equipment.position.lon]}
          icon={createCustomIcon({
            model: equipment.equipmentModel?.name ?? "Caminhão de carga",
          })}
          eventHandlers={{
            mouseover: (e) => {
              const marker = e.target;
              marker.openPopup();
            },
            mouseout: (e) => {
              const marker = e.target;
              marker.closePopup();
            },
            click: () => openSheet(equipment),
          }}
        >
          <Popup>
            <div className="flex flex-col items-start gap-4">
              <span>
                <strong>Nome:</strong> {equipment.name}
              </span>
              <span>
                <strong>Modelo:</strong> {equipment.equipmentModel?.name}
              </span>
              <span className="flex flex-row gap-4 items-center">
                <strong>Estado:</strong>{" "}
                <StatusBadge
                  text={equipment.state.name ?? "unknown"}
                  color={equipment.state.color ?? "#dedede"}
                />
              </span>
              <span>
                <strong>Posição:</strong> [{equipment.position.lat},{" "}
                {equipment.position.lon}]
              </span>
            </div>
          </Popup>
        </Marker>
      ))}

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
