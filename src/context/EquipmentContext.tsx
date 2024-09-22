import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  getEquipments,
  getEquipmentStates,
  getAllEquipmentLatestState,
  getEquipmentPositionHistory,
  getEquipmentStateHistory,
} from "../api/api";

// interfaces
interface Equipment {
  id: string;
  name: string;
}

interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

interface PositionHistory {
  equipmentId: string;
  positions: {
    lat: number;
    lon: number;
    date: string;
  }[];
}

interface EquipmentWithState {
  id: string;
  name: string;
  state: string;
  color: string;
}

// context
interface EquipmentContextType {
  equipments: EquipmentWithState[];
  equipmentStates: EquipmentState[];
  positions: PositionHistory[];
  getLatestState: (equipmentId: string) => EquipmentWithState | undefined;
  getEquipmentStateHistoryData: (equipmentId: string) => Promise<any>;
}

const EquipmentContext = createContext<EquipmentContextType | undefined>(
  undefined
);

// hook p usar context
export const useEquipmentContext = () => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error(
      "useEquipmentContext must be used within an EquipmentProvider"
    );
  }
  return context;
};

// provider
export const EquipmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [equipments, setEquipments] = useState<EquipmentWithState[]>([]);
  const [equipmentStates, setEquipmentStates] = useState<EquipmentState[]>([]);
  const [positions, setPositions] = useState<PositionHistory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentData = await getEquipments();
        const latestStateData = await getAllEquipmentLatestState();
        const stateData = await getEquipmentStates();
        const positionData = await getEquipmentPositionHistory();

        setEquipmentStates(stateData);
        setPositions(positionData);

        const equipmentsWithState = equipmentData.map(
          (equipment: Equipment) => {
            const equipmentState = latestStateData.find(
              (state: any) => state.equipmentId === equipment.id
            );
            const stateInfo = stateData.find(
              (state: EquipmentState) =>
                state.id === equipmentState?.equipmentStateId
            );

            return {
              id: equipment.id,
              name: equipment.name,
              state: stateInfo ? stateInfo.name : "Unknown",
              color: stateInfo ? stateInfo.color : "#000",
            };
          }
        );

        setEquipments(equipmentsWithState);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };

    fetchData();
  }, []);

  const getLatestState = (equipmentId: string) => {
    return equipments.find((equipment) => equipment.id === equipmentId);
  };

  const getEquipmentStateHistoryData = async (equipmentId: string) => {
    try {
      return await getEquipmentStateHistory(equipmentId);
    } catch (error) {
      console.error("Error fetching equipment state history:", error);
      return [];
    }
  };

  return (
    <EquipmentContext.Provider
      value={{
        equipments,
        equipmentStates,
        positions,
        getLatestState,
        getEquipmentStateHistoryData,
      }}
    >
      {children}
    </EquipmentContext.Provider>
  );
};
