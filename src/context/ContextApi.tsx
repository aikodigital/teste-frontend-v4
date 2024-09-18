import { createContext, useContext, useState } from 'react';
import {
  EquipamentData,
  EquipamentsModelData,
  EquipamentsStateData,
  EquipamentsStateHistory,
  EquipmentsPositionHistoryData,
  IContextApiValue,
} from './ContextApi.types';

const ContextApiContext = createContext<IContextApiValue>(
  {} as IContextApiValue
);

interface ContextApiProviderProps {
  children: React.ReactNode;
}

function ContextApiProvider({ children }: ContextApiProviderProps) {
  const [equipaments, setEquipaments] = useState<EquipamentData[]>([]);
  const [equipamentsModel, setEquipamentsModel] = useState<
    EquipamentsModelData[]
  >([]);
  const [equipamentsPositionHistory, setEquipamentPositionHistory] = useState<
    EquipmentsPositionHistoryData[]
  >([]);
  const [equipamentsState, setEquipamentsState] = useState<
    EquipamentsStateData[]
  >([]);
  const [equipamentsStateHistory, setEquipamentsStateHistory] = useState<
    EquipamentsStateHistory[]
  >([]);

  const value = {
    equipaments,
    setEquipaments,
    equipamentsModel,
    setEquipamentsModel,
    equipamentsPositionHistory,
    setEquipamentPositionHistory,
    equipamentsState,
    setEquipamentsState,
    equipamentsStateHistory,
    setEquipamentsStateHistory,
  };

  return (
    <ContextApiContext.Provider value={value}>
      {children}
    </ContextApiContext.Provider>
  );
}

export const useContextApi = () => useContext(ContextApiContext);
export { ContextApiProvider };
