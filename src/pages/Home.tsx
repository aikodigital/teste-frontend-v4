import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ReactDOMServer from "react-dom/server"; // Importar ReactDOMServer
import equipmentPositionHistory from "../data/equipmentPositionHistory.json";
import equipmentStateHistory from "../data/equipmentStateHistory.json";
import equipmentState from "../data/equipmentState.json";
import equipmentModel from "../data/equipmentModel.json";
import equipment from "../data/equipment.json";
import { EquipamentPositionHistory } from "../types/types";
import { FaTruck, FaSeedling, FaTools } from "react-icons/fa";
import { IconType } from "react-icons";

// Mapeamento de ícones baseado no tipo de equipamento (name)
const iconsMap: { [key: string]: IconType } = {
  "Caminhão de carga": FaTruck,
  Harvester: FaSeedling,
  "Garra traçadora": FaTools,
};

// Criar função para gerar ícones do Leaflet baseados em um ícone de FontAwesome
const createLeafletIcon = (IconComponent: IconType) => {
  return L.divIcon({
    html: ReactDOMServer.renderToString(<IconComponent size={24} />), // Converter ícone para HTML
    iconSize: [30, 30], // Tamanho do ícone
    className: "custom-icon", // Classe personalizada se precisar estilizar via CSS
  });
};

export const Home = () => {
  const [latestPositions, setLatestPositions] = useState<
    { date: string; lat: number; lon: number; equipamentId: string }[]
  >([]);

  const [equipmentStatesMap, setEquipmentStatesMap] = useState<
    { equipmentId: string; stateName: string; stateColor: string }[]
  >([]);

  // Função para obter o modelo de equipamento com base no equipmentId
  const getEquipamentModelName = (equipmentId: string): string => {
    // Encontrar o equipamento pelo ID
    const equipament = equipment.find((equip) => equip.id === equipmentId);

    // Se o equipamento não for encontrado, retornar 'Modelo desconhecido'
    if (!equipament) return "Modelo desconhecido";

    // Encontrar o modelo de equipamento pelo equipmentModelId do equipamento
    const equipmentModelItem = equipmentModel.find(
      (model) => model.id === equipament.equipmentModelId
    );

    // Retornar o nome do modelo ou 'Modelo desconhecido' se o modelo não for encontrado
    return equipmentModelItem ? equipmentModelItem.name : "Modelo desconhecido";
  };

  // Função para buscar o tipo de equipamento pelo ID usando o equipmentModel
  const getEquipamentType = (equipmentId: string) => {
    const equipamentType = getEquipamentModelName(equipmentId);
    return equipamentType;
  };

  // Função para buscar o histórico completo de estados do equipamento
  const getEquipmentStateHistory = (equipmentId: string) => {
    const history = equipmentStateHistory.find(
      (entry) => entry.equipmentId === equipmentId
    );
    if (!history) return [];

    // Ordenar estados por data, do mais recente para o mais antigo
    return history.states.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  // Função para mapear um ID de estado para o nome e cor
  const getStateDetails = (equipmentStateId: string) => {
    const stateDetails = equipmentState.find(
      (state) => state.id === equipmentStateId
    );
    return stateDetails
      ? { name: stateDetails.name, color: stateDetails.color }
      : { name: "Desconhecido", color: "#000" };
  };

  useEffect(() => {
    const fetchLatestPositions = () => {
      const data: EquipamentPositionHistory[] = equipmentPositionHistory;

      const latestPositions = data.map((item) => {
        const lastPosition = item.positions.reduce((latest, current) =>
          new Date(current.date) > new Date(latest.date) ? current : latest
        );
        return { ...lastPosition, equipamentId: item.equipmentId };
      });

      setLatestPositions(latestPositions);
    };

    const mapEquipmentStates = () => {
      const mappedStates = equipmentPositionHistory.map((item) => {
        const lastState = getEquipmentStateHistory(item.equipmentId)[0];
        const stateDetails = getStateDetails(lastState?.equipmentStateId || "");
        return {
          equipmentId: item.equipmentId,
          stateName: stateDetails.name,
          stateColor: stateDetails.color,
        };
      });
      setEquipmentStatesMap(mappedStates);
    };

    fetchLatestPositions();
    mapEquipmentStates();
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-600">
      <div className="flex w-full items-center justify-center">
        <MapContainer
          center={[-19.2, -45.97]}
          zoom={12}
          style={{ height: "800px", width: "900px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {latestPositions.map((position, index) => {
            const equipamentType = getEquipamentType(position.equipamentId);
            const SelectedIcon = iconsMap[equipamentType] || FaTools;

            // Criar o ícone personalizado com base no tipo de equipamento
            const leafletIcon = createLeafletIcon(SelectedIcon);

            // Buscar o estado atual do equipamento
            const currentState = equipmentStatesMap.find(
              (state) => state.equipmentId === position.equipamentId
            );

            // Buscar o histórico de estados do equipamento
            const stateHistory = getEquipmentStateHistory(
              position.equipamentId
            );

            return (
              <Marker
                key={index}
                position={[position.lat, position.lon]}
                icon={leafletIcon}
              >
                <Popup>
                  <div className="flex items-center gap-2">
                    <div className="grid w-[400px] h-[250px] grid-cols-2 gap-4">
                      <div>
                        <strong>Equipment:</strong> {equipamentType}
                        <br />
                        <br />
                        <strong>Equipment ID:</strong> {position.equipamentId}
                        <br />
                        <br />
                        <strong>Última atualização de data e hora:</strong>{" "}
                        {new Date(position.date).toLocaleString()}
                        <br />
                        <br />
                        <strong>Situação atual do equipamento:</strong>{" "}
                        <span
                          style={{
                            color: currentState?.stateColor || "#000",
                            fontWeight: "bold",
                          }}
                        >
                          {currentState?.stateName || "Desconhecido"}
                        </span>
                        <br />
                      </div>

                      <div>
                        <strong>Histórico de estados:</strong>
                        <ul className="max-h-52 overflow-y-auto space-y-2 mt-2">
                          {stateHistory.map((state, idx) => {
                            const details = getStateDetails(
                              state.equipmentStateId
                            );
                            return (
                              <li
                                key={idx}
                                className="flex justify-between items-center border-b pb-1"
                              >
                                <span
                                  style={{
                                    color: details.color,
                                    fontWeight: "bold",
                                  }}
                                >
                                  {details.name}
                                </span>
                                <span className="text-sm text-gray-600">
                                  {new Date(state.date).toLocaleString()}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};
