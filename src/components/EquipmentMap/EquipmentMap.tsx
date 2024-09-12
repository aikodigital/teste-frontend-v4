import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import equipmentData from "../../../data/equipment.json";
import equipmentPositionHistory from "../../../data/equipmentPositionHistory.json";
import equipmentState from "../../../data/equipmentState.json";
import equipmentStateHistory from "../../../data/equipmentStateHistory.json";
import equipmentModel from "../../../data/equipmentModel.json";
import Modal from "react-modal";
import "./EquipmentMap.scss";

Modal.setAppElement("#root");

interface Position {
  id: string;
  lat: number;
  lon: number;
}

interface State {
  id: string;
  name: string;
  color: string;
}

interface Model {
  id: string;
  name: string;
  hourlyEarnings: any[];
}

const EquipmentMap: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [equipmentStates, setEquipmentStates] = useState<any>({});
  const [stateHistory, setStateHistory] = useState<any>({});
  const [models, setModels] = useState<any>({});
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [selectedStateHistory, setSelectedStateHistory] = useState<any[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const latestPositions = equipmentPositionHistory.map((item: any) => {
      const lastPosition = item.positions[item.positions.length - 1];
      return {
        id: item.equipmentId,
        lat: lastPosition.lat,
        lon: lastPosition.lon,
      };
    });
    setPositions(latestPositions);

    const statesMap = equipmentState.reduce((acc: any, state: State) => {
      acc[state.id] = state;
      return acc;
    }, {});
    setEquipmentStates(statesMap);

    const stateHistoryMap = equipmentStateHistory.reduce((acc: any, history: any) => {
      acc[history.equipmentId] = history.states;
      return acc;
    }, {});
    setStateHistory(stateHistoryMap);

    const modelsMap = equipmentModel.reduce((acc: any, model: Model) => {
      acc[model.id] = model;
      return acc;
    }, {});
    setModels(modelsMap);
  }, []);

  useEffect(() => {
    if (selectedEquipmentId) {
      const history = stateHistory[selectedEquipmentId] || [];
      setSelectedStateHistory(history);
    } else {
      setSelectedStateHistory([]);
    }
  }, [selectedEquipmentId, stateHistory]);

  const getCurrentState = (equipmentId: string) => {
    const history = stateHistory[equipmentId];
    if (!history || history.length === 0) return null;
    const latestStateId = history[history.length - 1].equipmentStateId;
    return equipmentStates[latestStateId];
  };

  const getModelName = (modelId: string) => {
    return models[modelId]?.name || "Desconhecido";
  };

  const openModal = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEquipmentId(null);
  };

  return (
    <div>
      <MapContainer
        center={[-19.126536, -45.947756]}
        zoom={10}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {positions.map((pos) => {
          const currentState = getCurrentState(pos.id);
          const equipment = equipmentData.find((eq) => eq.id === pos.id);
          return (
            <Marker
              key={pos.id}
              position={[pos.lat, pos.lon]}
              eventHandlers={{
                click: () => openModal(pos.id),
              }}
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
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalhes do Equipamento"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Detalhes do Equipamento</h2>
        {selectedEquipmentId && (
          <div>
            <h3>
              {equipmentData.find((eq) => eq.id === selectedEquipmentId)?.name || "Equipamento Desconhecido"}
            </h3>
            <p>
              Modelo: {getModelName(equipmentData.find((eq) => eq.id === selectedEquipmentId)?.equipmentModelId || "")}
            </p>
            <p>
              Estado atual: {getCurrentState(selectedEquipmentId)?.name || "Desconhecido"}
            </p>
            <h4>Histórico de Estados:</h4>
            <div className="state-history">
              {selectedStateHistory.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStateHistory.map((state: any, index: number) => (
                      <tr key={index}>
                        <td>{new Date(state.date).toLocaleString()}</td>
                        <td>
                          {equipmentStates[state.equipmentStateId]?.name || "Desconhecido"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Sem histórico de estados disponível.</p>
              )}
            </div>
            <button className="close-button" onClick={closeModal}>
              Fechar
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EquipmentMap;
