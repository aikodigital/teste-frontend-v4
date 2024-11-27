import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon, LatLngExpression } from "leaflet";
import { useEquipmentStore } from "@/stores/equipment.store";
import { StatusBadge } from "../../../components/status-badge.component";
import { useAllData } from "@/hooks/use-all-data.hook";
import { useFilteredEquipmentData } from "@/hooks/use-filtered-data.hook";

export function MapComponent() {
  const positionDefault: LatLngExpression = [-19.264235, -46.092436];
  const openSheet = useEquipmentStore((state) => state.openSheet);
  const { allData } = useAllData();
  const { filteredData } = useFilteredEquipmentData(allData);

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
          icon={createCustomIcon(equipment.model ?? "Caminhão de carga")}
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
                <strong>Modelo:</strong> {equipment.model}
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
    </MapContainer>
  );
}
