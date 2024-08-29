import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import L from "leaflet";
import {
  equipmentPositionHistories,
  equipmentStateHistories,
  equipments,
  equipmentStates,
  equipmentModels,
} from "./dataLoader";
import StateHistoryModal from "./StateModal";

interface Position {
  lat: number;
  lon: number;
  date: string;
}

interface LatestPositionsMap {
  [key: string]: Position;
}

interface StateHours {
  [key: string]: number;
}

interface EarningsMap {
  [key: string]: number;
}

const MapView: React.FC = () => {
  const [latestPositions, setLatestPositions] = useState<any[]>([]);
  const [equipmentStatesMap, setEquipmentStatesMap] = useState<
    Map<string, string>
  >(new Map());
  const [showModal, setShowModal] = useState(false);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(
    null
  );
  const [mapCenter, setMapCenter] = useState<L.LatLng>(L.latLng(-19.12, -46));
  const [mapZoom, setMapZoom] = useState<number>(9.5);
  const [filterState, setFilterState] = useState<string>("");
  const [filterModel, setFilterModel] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredEquipmentId, setHoveredEquipmentId] = useState<string | null>(
    null
  );
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    const fetchPositionsAndStates = () => {
      const latestPositionsMap: LatestPositionsMap = {};
      const statesMap = new Map<string, string>();

      // Mapeia os estados mais recentes para cada equipamento
      equipmentStateHistories.forEach((history) => {
        const latestState = history.states[history.states.length - 1];
        if (latestState) {
          statesMap.set(history.equipmentId, latestState.equipmentStateId);
        }
      });

      // Mapeia as posições mais recentes para cada equipamento
      equipmentPositionHistories.forEach((history) => {
        const latestPosition = history.positions[history.positions.length - 1];
        if (latestPosition) {
          latestPositionsMap[history.equipmentId] = latestPosition;
        }
      });

      // Converte o mapeamento em uma lista de posições
      const positions = Object.keys(latestPositionsMap).map((key) => ({
        ...latestPositionsMap[key],
        equipmentId: key,
      }));
      setLatestPositions(positions);
      setEquipmentStatesMap(statesMap);
    };

    fetchPositionsAndStates();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(mapCenter, mapZoom);
    }
  }, [mapCenter, mapZoom]);

  const handleMarkerClick = (equipmentId: string) => {
    // Atualiza o centro e o zoom do mapa para o equipamento selecionado
    const position = latestPositions.find((p) => p.equipmentId === equipmentId);
    if (position) {
      setMapCenter(L.latLng(position.lat, position.lon));
    }
    setSelectedEquipmentId(equipmentId);
    setHoveredEquipmentId(equipmentId);
  };

  const handleMarkerHover = (equipmentId: string) => {
    setHoveredEquipmentId(equipmentId);
  };

  const handleMarkerLeave = () => {
    setHoveredEquipmentId(null);
  };

  // Filtro de estado
  const filteredPositions = latestPositions.filter((position) => {
    const stateId = equipmentStatesMap.get(position.equipmentId);
    return filterState === "" || stateId === filterState;
  });

  // Filtro de modelo
  const filteredEquipmentIds = equipments
    .filter((e) => filterModel === "" || e.equipmentModelId === filterModel)
    .map((e) => e.id);

  const finalFilteredPositions = filteredPositions.filter((position) =>
    filteredEquipmentIds.includes(position.equipmentId)
  );

  // Função para obter o ícone com base no modelo e estado
  const getIcon = (modelId: string, stateColor: string) => {
    const model = equipmentModels.find((m) => m.id === modelId);
    let iconHtml = '<div style="width: 24px; height: 24px;"></div>';

    if (model) {
      switch (model.name) {
        case "Caminhão de carga":
          iconHtml = `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.09 8.26L20.18 8.27L15.09 12.14L16.18 18.43L12 15.27L7.82 18.43L8.91 12.14L3.82 8.27L9.91 8.26L12 2Z" fill="${stateColor}"/>
          </svg>`;
          break;
        case "Harvester":
          iconHtml = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="${stateColor}"/>
        </svg>`;
          break;
        case "Garra traçadora":
          iconHtml = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="${stateColor}"/>
          </svg>`;
          break;
        default:
          iconHtml = `<div style="width: 24px; height: 24px; background-color: ${stateColor}; border-radius: 50%;"></div>`;
      }
    }

    return L.divIcon({
      className: "custom-icon",
      html: iconHtml,
      iconSize: [24, 24],
    });
  };

  // Obtém o histórico de posições para um equipamento
  const getPositionHistory = (equipmentId: string): LatLngTuple[] => {
    const history = equipmentPositionHistories.find(
      (h) => h.equipmentId === equipmentId
    );

    if (history) {
      // Ordena as posições por data se disponível
      return history.positions
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((pos) => [pos.lat, pos.lon] as LatLngTuple);
    }

    return [];
  };

  const handleSearch = () => {
    // Encontra o equipamento baseado na busca
    const equipment = equipments.find((e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (equipment) {
      // Encontra a posição mais recente do equipamento
      const position = latestPositions.find(
        (p) => p.equipmentId === equipment.id
      );

      if (position) {
        // Atualiza o centro e o zoom do mapa para o equipamento encontrado
        setMapCenter(L.latLng(position.lat, position.lon));
        setMapZoom(14); // Ajusta o zoom para um valor fixo de 14 ou outro valor desejado

        // Seleciona o equipamento para exibir o modal
        setSelectedEquipmentId(equipment.id);
      } else {
        console.log("No position found for the equipment.");
      }
    } else {
      console.log("No equipment found with the given search query.");
    }
  };

  return (
    <>
      <div className="mb-4">
        <div className="flex justify-center items-center flex-wrap gap-4 space-x-4">
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="border-slate-300 rounded text-slate-700"
          >
            <option value="">Todos os Estados</option>
            {equipmentStates.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>

          <select
            value={filterModel}
            onChange={(e) => setFilterModel(e.target.value)}
            className="border-slate-300 rounded text-slate-700"
          >
            <option value="">Todos os Modelos</option>
            {equipmentModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder=" Buscar Equipamento"
              className="rounded text-slate-700 border-slate-700"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700 transition-all"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      <MapContainer
        ref={mapRef}
        className="z-[0]"
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "80vh", width: "90%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {finalFilteredPositions.map((position, index) => {
          const equipment = equipments.find(
            (e) => e.id === position.equipmentId
          );
          const stateId = equipmentStatesMap.get(position.equipmentId);
          const state = equipmentStates.find((s) => s.id === stateId);
          const model = equipmentModels.find(
            (m) => m.id === (equipment?.equipmentModelId || "")
          );

          // Calcula a produtividade
          const operatingHours =
            equipmentStateHistories
              .find((history) => history.equipmentId === position.equipmentId)
              ?.states.filter((s) => s.equipmentStateId === stateId && s.date)
              .length || 0;
          const totalHours =
            equipmentStateHistories.find(
              (history) => history.equipmentId === position.equipmentId
            )?.states.length || 0;
          const productivity = totalHours
            ? (operatingHours / totalHours) * 100
            : 0;

          return (
            <Marker
              key={index}
              position={[position.lat, position.lon]}
              icon={getIcon(
                equipment?.equipmentModelId || "",
                state?.color || "slate"
              )}
              eventHandlers={{
                click: () => handleMarkerClick(position.equipmentId),
                mouseover: () => handleMarkerHover(position.equipmentId),
                mouseout: handleMarkerLeave,
              }}
            >
              <Popup>
                {equipment ? (
                  <>
                    <div>{equipment.name}</div>
                    <div>{model?.name || "Modelo desconhecido"}</div>
                    <div
                      className="font-bold text-lg"
                      style={{ color: state?.color || "black" }}
                    >
                      {state ? state.name : "Estado desconhecido"}
                    </div>
                    <div>Produtividade: {productivity.toFixed(2)}%</div>

                    {/* Calcular o ganho */}
                    <div>
                      Ganho por equipamento:{" "}
                      {(() => {
                        // Obter o modelo do equipamento e suas taxas horárias
                        const modelHourlyEarnings =
                          equipmentModels.find(
                            (m) => m.id === equipment.equipmentModelId
                          )?.hourlyEarnings || [];
                        const states =
                          equipmentStateHistories.find(
                            (history) =>
                              history.equipmentId === position.equipmentId
                          )?.states || [];

                        // Calcular horas por estado
                        const stateHours = states.reduce(
                          (acc: StateHours, state) => {
                            acc[state.equipmentStateId] =
                              (acc[state.equipmentStateId] || 0) + 1;
                            return acc;
                          },
                          {} as StateHours
                        );

                        // Calcular o mapa de rendimentos
                        const earningsMap = modelHourlyEarnings.reduce(
                          (map: EarningsMap, earning) => {
                            map[earning.equipmentStateId] = earning.value;
                            return map;
                          },
                          {} as EarningsMap
                        );

                        // Calcular o ganho total
                        const totalEarnings = Object.keys(stateHours).reduce(
                          (total, stateId) => {
                            const hours = stateHours[stateId];
                            const rate = earningsMap[stateId] || 0;
                            return total + hours * rate;
                          },
                          0
                        );

                        return totalEarnings.toFixed(2);
                      })()}
                    </div>

                    <br />
                    <span className="text-slate-400">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowModal(true);
                          setSelectedEquipmentId(position.equipmentId);
                        }}
                      >
                        Histórico Completo
                      </a>
                    </span>
                  </>
                ) : (
                  "Equipamento desconhecido"
                )}
              </Popup>
            </Marker>
          );
        })}

        {hoveredEquipmentId && (
          <>
            {getPositionHistory(hoveredEquipmentId).map((pos, index) => (
              <Circle
                key={index}
                center={L.latLng(pos[0], pos[1])}
                radius={50}
                color="slate"
                fillColor="slate"
                fillOpacity={0.5}
              />
            ))}
            <Polyline
              positions={getPositionHistory(hoveredEquipmentId)}
              color="blue"
              weight={4}
              opacity={0.6}
            />
          </>
        )}
      </MapContainer>

      {selectedEquipmentId && (
        <StateHistoryModal
          show={showModal}
          onClose={() => setShowModal(false)}
          equipmentId={selectedEquipmentId}
        />
      )}
    </>
  );
};

export default MapView;
