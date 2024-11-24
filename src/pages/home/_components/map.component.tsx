import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DivIcon, LatLngExpression } from "leaflet";
import { useEquipmentStore } from "@/stores/equipment.store";
import { useEquipmentData } from "@/hooks/use-equipment-data.hook";

export function Map() {
  const positionDefault: LatLngExpression = [-19.264235, -46.092436];
  const openSheet = useEquipmentStore((state) => state.openSheet);
  const { data } = useEquipmentData();

  const createCustomIcon = (color: string) => {
    return new DivIcon({
      className: "custom-icon",
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
    });
  };

  return (
    <MapContainer
      center={positionDefault}
      zoom={13}
      zoomControl={false}
      className="z-10"
    >
      <ZoomControl position="topright" />
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((equipment, eqIndex) => (
        <Marker
          key={`${eqIndex}-${equipment.id}`}
          position={[equipment.position.lat, equipment.position.lon]}
          icon={createCustomIcon(equipment.state.color!)}
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
            <div className="flex flex-col items-start">
              <span>
                <strong>Nome:</strong> {equipment.name}
              </span>
              <span>
                <strong>Modelo:</strong> {equipment.model}
              </span>
              <span>
                <strong>Estado:</strong> {equipment.state.name}
              </span>
              <span>
                <strong>Posição:</strong> [{equipment.position.lat},{" "}
                {equipment.position.lon}]
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
