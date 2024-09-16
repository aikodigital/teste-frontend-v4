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

const calculateEarnings = (
  equipmentId: string,
  stateHistory: Record<string, { date: string; equipmentStateId: string }[]>,
  models: Record<string, { hourlyEarnings: { equipmentStateId: string; value: number }[] }>
) => {
  const equipment = equipmentData.find(equip => equip.id === equipmentId);
  
  if (!equipment) {
    console.error(`Equipamento com ID ${equipmentId} não encontrado.`);
    return "R$0,00"; 
  }

  const model = models[equipment.equipmentModelId];
  if (!model) {
    console.error(`Modelo de equipamento com ID ${equipment.equipmentModelId} não encontrado.`);
    return "R$0,00"; 
  }

  const history = stateHistory[equipmentId] || [];
  if (history.length === 0) {
    console.warn(`Nenhum histórico de estado encontrado para o equipamento com ID ${equipmentId}.`);
    return "R$0,00";
  }

  let totalEarnings = 0;

  for (let i = 0; i < history.length - 1; i++) {
    const currentState = history[i];
    const nextState = history[i + 1];

    const startDate = new Date(currentState.date);
    const endDate = new Date(nextState.date);
    const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

    const hourlyRate = model.hourlyEarnings.find(earning => earning.equipmentStateId === currentState.equipmentStateId)?.value;

    if (hourlyRate === undefined) {
      console.error(`Valor por hora para o estado ${currentState.equipmentStateId} não encontrado no modelo.`);
      continue; 
    }

    const stateEarnings = hourlyRate * hours;
    totalEarnings += stateEarnings;
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedEarnings = formatter.format(totalEarnings);

  return formattedEarnings;
};


const EquipmentMap: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [positionsHistory, setPositionsHistory] = useState<Record<string, Position[]>>({});
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

    const positionsHistoryMap = equipmentPositionHistory.reduce(
      (acc: Record<string, Position[]>, item: any) => {
        acc[item.equipmentId] = item.positions;
        return acc;
      },
      {}
    );
    setPositionsHistory(positionsHistoryMap);

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

  const calculateProductivity = (equipmentId: string) => {
    const history = stateHistory[equipmentId];
    if (!history || history.length === 0) return 0;

    let productiveHours = 0;
    const totalHours = 24; 

    history.forEach((stateRecord) => {
      const state = equipmentStates[stateRecord.equipmentStateId];
      if (state && state.name === "Operando") {
        productiveHours += 1;
      }
    });

    const productivity = (productiveHours / totalHours) * 100;
    return productivity.toFixed(2);
  };

  const openModal = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEquipmentId(null);
  };

  const earnings = selectedEquipmentId ? calculateEarnings(selectedEquipmentId, stateHistory, models) : 0;

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
        positionsHistory={positionsHistory}
        equipmentData={equipmentData}
        equipmentStates={equipmentStates}
        stateHistory={stateHistory}
        models={models}
        onMarkerClick={openModal}
        calculateProductivity={calculateProductivity}
      />
      <EquipmentModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedEquipmentId={selectedEquipmentId}
        equipmentData={equipmentData}
        equipmentStates={equipmentStates}
        stateHistory={stateHistory}
        earnings={earnings}
      />
    </div>
  );
};

export default EquipmentMap;
