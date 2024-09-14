import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Definindo o tipo esperado para o array de equipamentos
interface Equipment {
  id: number;
  lat: number;
  lng: number;
  model: string;
}

interface MapComponentProps {
  equipment: Equipment[];
  positionHistory: [number, number][];
}

const getIconForModel = (model: string) => {
  switch (model) {
    case "modelo1":
      return "icon1.svg"; // Coloque o caminho correto do ícone aqui
    case "modelo2":
      return "icon2.svg";
    default:
      return "default-icon.svg";
  }
};

const MapComponent: React.FC<MapComponentProps> = ({
  equipment,
  positionHistory,
}) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {equipment.map((item) => (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          icon={L.icon({
            iconUrl: getIconForModel(item.model),
            iconSize: [32, 32],
          })}
        />
      ))}
      <Polyline positions={positionHistory} color="blue" />
    </MapContainer>
  );
};

export default MapComponent;
