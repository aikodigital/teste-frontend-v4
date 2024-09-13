// MapComponent.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Position, State, Model } from "../../types/Equipment";

interface MapComponentProps {
  positions: Position[];
  equipmentData: any[];
  equipmentStates: Record<string, State>;
  stateHistory: Record<string, { date: string; equipmentStateId: string }[]>;
  models: Record<string, Model>;
  onMarkerClick: (equipmentId: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  positions,
  equipmentData,
  equipmentStates,
  stateHistory,
  models,
  onMarkerClick,
}) => {
  const getCurrentState = (equipmentId: string) => {
    const history = stateHistory[equipmentId];
    if (!history || history.length === 0) return null;
    const latestStateId = history[history.length - 1].equipmentStateId;
    return equipmentStates[latestStateId];
  };

  const getModelName = (modelId: string) => {
    return models[modelId]?.name || "Desconhecido";
  };

  return (
    <MapContainer
      center={[-19.126536, -45.947756]}
      zoom={10}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {positions.map((pos: Position) => {
        const currentState = getCurrentState(pos.id);
        const equipment = equipmentData.find((eq) => eq.id === pos.id);

        return (
          <Marker
            key={pos.id}
            position={[pos.lat, pos.lon]}
            icon={L.divIcon({
              className: "custom-icon",
              html: `<div style="background-color: ${currentState?.color || "#000"};" class="icon"></div>`,
              iconSize: [25, 25],
            })}
          >
            <Popup>
              <div>
                <h3>{equipment?.name || "Equipamento Desconhecido"}</h3>
                <p>Modelo: {getModelName(equipment?.equipmentModelId || "")}</p>
                {currentState && (
                  <p style={{ color: currentState.color }}>
                    Estado atual: {currentState.name}
                  </p>
                )}
                <button onClick={(e) => {
                  e.stopPropagation(); // Prevents the marker click event
                  onMarkerClick(pos.id);
                }}>
                  Ver Detalhes
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
