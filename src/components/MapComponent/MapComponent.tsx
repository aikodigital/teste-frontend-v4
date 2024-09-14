import React, { useState } from "react";
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
  calculateProductivity: (equipmentId: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  positions,
  equipmentData,
  equipmentStates,
  stateHistory,
  models,
  onMarkerClick,
  calculateProductivity,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getCurrentState = (equipmentId: string) => {
    const history = stateHistory[equipmentId];
    if (!history || history.length === 0) return null;
    const latestStateId = history[history.length - 1].equipmentStateId;
    return equipmentStates[latestStateId];
  };

  const getModelName = (modelId: string) => {
    return models[modelId]?.name || "Desconhecido";
  };

  const filteredPositions = positions.filter((pos) => {
    const equipment = equipmentData.find((eq) => eq.id === pos.id);
    return equipment?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar Equipamento"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-full max-w-sm mx-auto mb-4"
      />
      <MapContainer center={[-19.126536, -45.947756]} zoom={10} style={{ height: "500px", width: "50vw" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {filteredPositions.map((pos: Position) => {
          const currentState = getCurrentState(pos.id);
          const equipment = equipmentData.find((eq) => eq.id === pos.id);
          const productivity = calculateProductivity(pos.id);

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
                  <p>Produtividade: {productivity as any  }%</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkerClick(pos.id);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
