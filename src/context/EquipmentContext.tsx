import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { organizeData } from '../utils/dataOrganizer';
import {
  Equipment,
  EquipmentModel,
  EquipmentPositionHistory,
  EquipmentState,
  EquipmentStateHistory,
  FilteredEquipment,
  OrganizedEquipment,
} from '../types/types';
import {
  useEquipment,
  useEquipmentPositionHistory,
  useEquipmentModel,
  useEquipmentState,
  useEquipmentStateHistory,
} from '../hooks/useEquipment';

interface EquipmentContextType {
  organizedData: OrganizedEquipment[];
  filteredData: FilteredEquipment[];
  setFilteredData: React.Dispatch<React.SetStateAction<FilteredEquipment[]>>;
  resultFilter: FilteredEquipment[];
  setResultFilter: React.Dispatch<React.SetStateAction<FilteredEquipment[]>>;
  filtered: boolean;
  setFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  local: Number[];
  localHistory: Number[];
  setLocal: React.Dispatch<React.SetStateAction<Number[]>>;
  setLocalHistory: React.Dispatch<React.SetStateAction<Number[]>>;
  setEquipment: React.Dispatch<React.SetStateAction<Equipment[]>>;
  setEquipmentModel: React.Dispatch<React.SetStateAction<EquipmentModel[]>>;
  setEquipmentPositionHistory: React.Dispatch<
    React.SetStateAction<EquipmentPositionHistory[]>
  >;
  setEquipmentState: React.Dispatch<React.SetStateAction<EquipmentState[]>>;
  setEquipmentStateHistory: React.Dispatch<
    React.SetStateAction<EquipmentStateHistory[]>
  >;
}

const EquipmentContext = createContext<EquipmentContextType | undefined>(
  undefined,
);

export const EquipmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [setEquipment] = useState<Equipment[]>([]);
  const [setEquipmentModel] = useState<EquipmentModel[]>([]);
  const [setEquipmentPositionHistory] = useState<EquipmentPositionHistory[]>(
    [],
  );
  const [setEquipmentState] = useState<EquipmentState[]>([]);
  const [setEquipmentStateHistory] = useState<EquipmentStateHistory[]>([]);
  const [organizedData, setOrganizedData] = useState<OrganizedEquipment[]>([]);
  const [filteredData, setFilteredData] = useState<FilteredEquipment[]>([]);
  const [resultFilter, setResultFilter] = useState<FilteredEquipment[]>([]);
  const [filtered, setFiltered] = useState<boolean>(false);
  const [local, setLocal] = useState<Number[]>();
  const [localHistory, setLocalHistory] = useState<Number[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEquipments: Equipment[] = await useEquipment();
        const fetchedPositionHistory: EquipmentPositionHistory[] =
          await useEquipmentPositionHistory();
        const fetchedModels: EquipmentModel[] = await useEquipmentModel();
        const fetchedStates: EquipmentState[] = await useEquipmentState();
        const fetchedStateHistory: EquipmentStateHistory[] =
          await useEquipmentStateHistory();

        const organized = organizeData(
          fetchedEquipments,
          fetchedPositionHistory,
          fetchedModels,
          fetchedStates,
          fetchedStateHistory,
        );
        setOrganizedData(organized);
      } catch (error) {
        console.error('Erro ao buscar dados', error);
      }
    };

    fetchData();
  }, []);

  return (
    <EquipmentContext.Provider
      value={{
        organizedData,
        filteredData,
        setFilteredData,
        resultFilter,
        setResultFilter,
        filtered,
        setFiltered,
        local,
        localHistory,
        setLocal,
        setLocalHistory,
        setEquipment,
        setEquipmentModel,
        setEquipmentPositionHistory,
        setEquipmentState,
        setEquipmentStateHistory,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipmentContext = () => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error(
      'useEquipmentContext must be used within an EquipmentProvider',
    );
  }
  return context;
};
