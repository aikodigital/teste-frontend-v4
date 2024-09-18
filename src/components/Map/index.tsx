import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEquipmentContext } from "../../context/EquipamentContext";
import { Equipment } from "../../types";

interface MapProps {
  showRoutes: boolean;
}

const createMarkerIcon = (markerName: string) => {
  let iconHtml = "";
  let color = "#f5f5f5"; 

  switch (markerName) {
    case "Operando":
      color = "#2ecc71";
      iconHtml = `<div style="font-size: 24px; color: ${color};">🚛</div>`;
      break;
    case "Manutenção":
      color = "#f39c12";
      iconHtml = `<div style="font-size: 24px; color: ${color};">🛠️</div>`;
      break;
    case "Parado":
      color = "#e74c3c"; 
      iconHtml = `<div style="font-size: 24px; color: ${color};">⚙️</div>`;
      break;
    default:
      color = "#f5f5f5";
      iconHtml = `<div style="font-size: 24px; color: ${color};">📍</div>`;
      break;
  }

  return L.divIcon({
    className: "custom-marker",
    html: `<div>${iconHtml}</div>`,
    iconSize: [50, 50],
    iconAnchor: [12, 25],
  });
};

const Map: React.FC<MapProps> = ({ showRoutes }) => {
  const { equipments, positions, states, stateHistories, setSelectedEquipment } = useEquipmentContext();

  const handleMarkerClick = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
  };

  return (
    <MapContainer
      center={[-19.126536, -45.947756]}
      zoom={10}
      style={{ width: "100%", height: "700px" }}
      className="mb-4 rounded-b-[40px] px-10"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {equipments.map((equipment) => {
        const equipmentPos = positions.find(
          (p) => p.equipmentId === equipment.id
        );

        if (equipmentPos) {
          const latestPosition = equipmentPos.positions.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )[0];

          const latestStateHistory = stateHistories.find(
            (sh) => sh.equipmentId === equipment.id
          );
          const latestStateId = latestStateHistory
            ? latestStateHistory.states.sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )[0].equipmentStateId
            : null;

          const state = states.find((s) => s.id === latestStateId);
          const markerName = state ? state.name : "#000000";

          const markerIcon = createMarkerIcon(markerName);

          return (
            <Marker
              key={equipment.id}
              position={[latestPosition.lat, latestPosition.lon]}
              eventHandlers={{ click: () => handleMarkerClick(equipment) }}
              icon={markerIcon}
            >
              <Popup>
                <strong className="text-xl">{equipment.name}</strong>
                <br />
                Estado: {state ? state.name : "Desconhecido"}
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
      {showRoutes &&
        equipments.map((equipment) => {
          const equipmentPos = positions.find(
            (p) => p.equipmentId === equipment.id
          );

          if (equipmentPos) {
            const waypoints = equipmentPos.positions.map((p) =>
              [p.lat, p.lon] as [number, number]
            );

            return (
              <Polyline
                key={equipment.id}
                positions={waypoints}
                color="blue"
                weight={3}
                opacity={0.7}
              />
            );
          }
          return null;
        })}
    </MapContainer>
  );
};

export default Map;
