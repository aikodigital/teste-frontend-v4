// EquipmentMap.tsx
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
      <MapComponent
        positions={positions}
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
