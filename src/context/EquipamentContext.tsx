import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  Equipment,
  EquipmentPositionHistory,
  EquipmentState,
  EquipmentStateHistory,
  PositionFilter,
  PositionWithState,
  EquipmentContextProps,
  Position,
  EquipmentModel,
} from "../types";

const EquipmentContext = createContext<EquipmentContextProps | undefined>(undefined);

export const EquipmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [equipmentModels, setEquipmentModels] = useState<EquipmentModel[]>([]);
  const [positions, setPositions] = useState<EquipmentPositionHistory[]>([]);
  const [states, setStates] = useState<EquipmentState[]>([]);
  const [stateHistories, setStateHistories] = useState<EquipmentStateHistory[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [filteredPositions, setFilteredPositions] = useState<PositionWithState[]>([]);
  const [positionFilter, setPositionFilter] = useState<PositionFilter | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentResponse = await fetch("/data/equipment.json");
        const equipmentData = await equipmentResponse.json();
        setEquipments(equipmentData);

        const equipmentModelResponse = await fetch("/data/equipmentModel.json");
        const equipmentModelData = await equipmentModelResponse.json();
        setEquipmentModels(equipmentModelData);

        const positionResponse = await fetch("/data/equipmentPositionHistory.json");
        const positionData = await positionResponse.json();
        setPositions(positionData);

        const stateResponse = await fetch("/data/equipmentState.json");
        const stateData = await stateResponse.json();
        setStates(stateData);

        const stateHistoryResponse = await fetch("/data/equipmentStateHistory.json");
        const stateHistoryData = await stateHistoryResponse.json();
        setStateHistories(stateHistoryData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (positionFilter) {
      const { startDate, endDate } = positionFilter;
      const filtered = positions.flatMap((posHist: EquipmentPositionHistory) =>
        posHist.positions
          .filter((p: Position) => new Date(p.date) >= new Date(startDate) && new Date(p.date) <= new Date(endDate))
          .map((p: Position) => ({
            ...p,
            stateId: stateHistories.find(sh => sh.equipmentId === posHist.equipmentId)?.states.find(
              s => new Date(s.date) <= new Date(p.date)
            )?.equipmentStateId ?? null
          }))
      );
      setFilteredPositions(filtered);
    }
  }, [positionFilter, positions, stateHistories]);


  return (
    <EquipmentContext.Provider
      value={{
        equipments,
        positions,
        states,
        stateHistories,
        selectedEquipment,
        setSelectedEquipment,
        equipmentPositions: positions,
        filteredPositions,
        setFilteredPositions,
        setPositionFilter,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipmentContext = () => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error("useEquipmentContext must be used within an EquipmentProvider");
  }
  return context;
};
