import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Position, State, Model } from "../../types/Equipment";

interface MapComponentProps {
  positions: Position[];
  positionsHistory: Record<string, Position[]>;
  equipmentData: any[];
  equipmentStates: Record<string, State>;
  stateHistory: Record<string, { date: string; equipmentStateId: string }[]>;
  models: Record<string, Model>;
  onMarkerClick: (equipmentId: string) => void;
  calculateProductivity: (equipmentId: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  positions,
  positionsHistory,
  equipmentData,
  equipmentStates,
  stateHistory,
  models,
  onMarkerClick,
  calculateProductivity,
}) => {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Novo estado para o termo de pesquisa

  const getCurrentState = (equipmentId: string) => {
    const history = stateHistory[equipmentId];
    if (!history || history.length === 0) return null;
    const latestStateId = history[history.length - 1].equipmentStateId;
    return equipmentStates[latestStateId];
  };

  const getModelName = (modelId: string) => {
    return models[modelId]?.name || "Desconhecido";
  };

  const getIconForModel = (modelId: string) => {
    const modelColors: Record<string, string> = {
      "a3540227-2f0e-4362-9517-92f41dabbfdf": "#ff5722",
      "9c3d009e-0d42-4a6e-9036-193e9bca3199": "#4caf50",
      "a4b0c114-acd8-4151-9449-7d12ab9bf40f": "#2196f3",
    };

    const color = modelColors[modelId] || "#000";

    return L.divIcon({
      className: "custom-icon",
      html: `<div style="background-color: ${color};" class="icon"></div>`,
      iconSize: [25, 25],
    });
  };

  const getPolylinePositions = (equipmentId: string): LatLngTuple[] => {
    return positionsHistory[equipmentId]?.map((pos) => [pos.lat, pos.lon] as LatLngTuple) || [];
  };

  const filteredPositions = positions.filter((pos) => {
    const equipment = equipmentData.find((eq) => eq.id === pos.id);
    return (
      equipment?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      pos.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment?.equipmentModelId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });  

  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar equipamento por nome, modelo ou ID"
        className="mb-4 p-2 border w-[100%] self-center border-gray-300 rounded-md"
      />
      <MapContainer
        center={[-19.126536, -45.947756]}
        zoom={10}
        style={{ height: "50vh", width: "80vw" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {filteredPositions.map((pos) => {
          const currentState = getCurrentState(pos.id);
          const equipment = equipmentData.find((eq) => eq.id === pos.id);
          const productivity = calculateProductivity(pos.id);

          return (
            <Marker
              key={pos.id}
              position={[pos.lat, pos.lon]}
              icon={getIconForModel(equipment?.equipmentModelId || "")}
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
                  <p>Produtividade: {productivity as any}%</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkerClick(pos.id);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
                  >
                    Ver Detalhes
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (selectedEquipmentId === pos.id) {
                        setSelectedEquipmentId(null);
                      } else {
                        setSelectedEquipmentId(pos.id);
                      }
                    }}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition ease-in-out duration-300"
                  >
                    {selectedEquipmentId === pos.id ? "Ocultar Histórico" : "Mostrar Histórico"}
                  </button>

                  {selectedEquipmentId === pos.id && (
                    <div className="popup">
                      <Polyline
                        positions={getPolylinePositions(pos.id)}
                        color="blue"
                        weight={4}
                        opacity={0.7}
                        dashArray="10, 10"
                      />
                    </div>
                  )}
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
