"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import equipmentData from "../data/equipment.json";
import equipmentStateData from "../data/equipmentState.json";
import equipmentStateHistoryData from "../data/equipmentStateHistory.json";
import equipmentPositionData from "../data/equipmentPositionHistory.json";
import equipmentModelData from "../data/equipmentModel.json";

interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

interface Position {
  equipmentId: string;
  positions: { date: string; lat: number; lon: number }[];
}

export interface State {
  id: string;
  name: string;
  color: string;
}

interface StateHistory {
  equipmentId: string;
  states: { date: string; equipmentStateId: string }[];
}

interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: { equipmentStateId: string; value: number }[];
}

interface EquipmentContextType {
  equipments: Equipment[];
  positions: Position[];
  states: State[];
  stateHistory: StateHistory[];
  equipmentModels: EquipmentModel[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string | null;
  setStatusFilter: (filter: string | null) => void;
}

interface EquipmentProviderProps {
  children: ReactNode;
}

const EquipmentContext = createContext<EquipmentContextType | undefined>(
  undefined
);

export const EquipmentProvider = ({ children }: EquipmentProviderProps) => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [stateHistory, setStateHistory] = useState<StateHistory[]>([]);
  const [equipmentModels, setEquipmentModels] = useState<EquipmentModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    setEquipments(equipmentData);
    setPositions(equipmentPositionData);
    setStates(equipmentStateData);
    setStateHistory(equipmentStateHistoryData);
    setEquipmentModels(equipmentModelData);
  }, []);

  return (
    <EquipmentContext.Provider
      value={{
        equipments,
        positions,
        states,
        stateHistory,
        equipmentModels,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipment = () => {
  const context = useContext(EquipmentContext);
  if (!context)
    throw new Error("ERR");
  return context;
};
