import React, { useState, useEffect } from "react";
import MapComponent from "../MapComponent/MapComponent";
import EquipmentModal from "../EquipmentModal/EquipmentModal";
import equipmentData from "../../../data/equipment.json";
import equipmentPositionHistory from "../../../data/equipmentPositionHistory.json";
import equipmentState from "../../../data/equipmentState.json";
import equipmentStateHistory from "../../../data/equipmentStateHistory.json";
import equipmentModel from "../../../data/equipmentModel.json";
import "./EquipmentMap.scss";
import { Model, Position, State } from "../../types/Equipment";

const EquipmentMap: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [equipmentStates, setEquipmentStates] = useState<Record<string, State>>({});
  const [stateHistory, setStateHistory] = useState<Record<string, { date: string; equipmentStateId: string }[]>>({});
  const [models, setModels] = useState<Record<string, Model>>({});
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const [selectedStateFilter, setSelectedStateFilter] = useState<string | null>(null);
  const [selectedModelFilter, setSelectedModelFilter] = useState<string | null>(null);

  useEffect(() => {
    const latestPositions = equipmentPositionHistory.map((item: any) => {
      const lastPosition = item.positions[item.positions.length - 1];
      return {
        id: item.equipmentId,
        lat: lastPosition.lat,
        lon: lastPosition.lon,
        date: lastPosition.date || "",
      };
    });
    setPositions(latestPositions);

    const statesMap = equipmentState.reduce((acc: Record<string, State>, state: State) => {
      acc[state.id] = state;
      return acc;
    }, {});
    setEquipmentStates(statesMap);

    const stateHistoryMap = equipmentStateHistory.reduce(
      (acc: Record<string, { date: string; equipmentStateId: string }[]>, history: any) => {
        acc[history.equipmentId] = history.states;
        return acc;
      },
      {}
    );
    setStateHistory(stateHistoryMap);

    const modelsMap = equipmentModel.reduce((acc: Record<string, Model>, model: Model) => {
      acc[model.id] = model;
      return acc;
    }, {});
    setModels(modelsMap);
  }, []);

  const getCurrentState = (equipmentId: string) => {
    const history = stateHistory[equipmentId];
    if (!history || history.length === 0) return null;
    const latestStateId = history[history.length - 1].equipmentStateId;
    return equipmentStates[latestStateId];
  };

  const filteredPositions = positions.filter((pos) => {
    const equipment = equipmentData.find((eq) => eq.id === pos.id);
    const currentState = getCurrentState(pos.id);
    const stateFilterMatch = !selectedStateFilter || currentState?.id === selectedStateFilter;
    const modelFilterMatch = !selectedModelFilter || equipment?.equipmentModelId === selectedModelFilter;
    return stateFilterMatch && modelFilterMatch;
  });

  const openModal = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEquipmentId(null);
  };

  return (
    <div className="mapContainer">
      <div className="filters">
        <label>
          Filtrar por Estado:
          <select
            value={selectedStateFilter || ""}
            onChange={(e) => setSelectedStateFilter(e.target.value || null)}
          >
            <option value="">Todos</option>
            {Object.values(equipmentStates).map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Filtrar por Modelo:
          <select
            value={selectedModelFilter || ""}
            onChange={(e) => setSelectedModelFilter(e.target.value || null)}
          >
            <option value="">Todos</option>
            {Object.values(models).map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <MapComponent
        positions={filteredPositions}
        equipmentData={equipmentData}
        equipmentStates={equipmentStates}
        stateHistory={stateHistory}
        models={models}
        onMarkerClick={openModal}
      />
      <EquipmentModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedEquipmentId={selectedEquipmentId}
        equipmentData={equipmentData}
        equipmentStates={equipmentStates}
        stateHistory={stateHistory}
      />
    </div>
  );
};

export default EquipmentMap;
