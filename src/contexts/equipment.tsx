import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
  } from "react";
  import equipmentData from "../data/equipment.json";
  import equipmentModelData from "../data/equipmentModel.json";
  import equipmentPositionHistoryData from "../data/equipmentPositionHistory.json";
  import equipmentStateData from "../data/equipmentState.json";
  import equipmentStateHistoryData from "../data/equipmentStateHistory.json";
  
  interface EquipmentContextProps {
    equipments: Equipment[];
    filterByName: (stateName: string) => void;
    filterByState: (stateName: string) => void;
    filterByModel: (modelName: string) => void;
    clearFilters: () => void;
  }
  
  const EquipmentContext = createContext<EquipmentContextProps | undefined>(
    undefined,
  );
  
  export const useEquipmentContext = (): EquipmentContextProps => {
    const context = useContext(EquipmentContext);
    if (!context) {
      throw new Error(
        "useEquipmentContext must be used within a EquipmentProvider",
      );
    }
    return context;
  };
  
  export const EquipmentProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);
  
    const getEquipmentData = useCallback(() => {
      const combinedData = equipmentData.map((equipment) => {
        const equipmentModel = equipmentModelData.find(
          (model) => model.id === equipment.equipmentModelId,
        );
  
        const hourlyEarnings =
          equipmentModel?.hourlyEarnings.map((earning) => {
            const equipmentState = equipmentStateData.find(
              (state) => state.id === earning.equipmentStateId,
            );
            return {
              equipmentState: {
                id: equipmentState?.id || "",
                name: equipmentState?.name || "",
                color: equipmentState?.color || "",
              },
              value: earning.value,
            };
          }) || [];
  
        const positionHistoryEntry = equipmentPositionHistoryData.find(
          (entry) => entry.equipmentId === equipment.id,
        );
        const lastFivePositions = positionHistoryEntry
          ? positionHistoryEntry.positions.slice(-5)
          : [];
  
        const stateHistoryEntry = equipmentStateHistoryData.find(
          (entry) => entry.equipmentId === equipment.id,
        );
        const states = stateHistoryEntry
          ? stateHistoryEntry.states
              .map((stateHistory) => {
                const equipmentState = equipmentStateData.find(
                  (state) => state.id === stateHistory.equipmentStateId,
                );
                return {
                  date: stateHistory.date,
                  equipmentState: {
                    id: equipmentState?.id || "",
                    name: equipmentState?.name || "",
                    color: equipmentState?.color || "",
                  },
                };
              })
              .reverse()
          : [];
  
        return {
          id: equipment.id,
          name: equipment.name,
          equipmentModel: equipmentModel
            ? {
                id: equipmentModel.id,
                name: equipmentModel.name,
                hourlyEarnings,
              }
            : null,
          positions: lastFivePositions.map((position) => ({
            date: position.date,
            lat: position.lat,
            lon: position.lon,
          })),
          states: states,
        };
      });
  
      setEquipments(combinedData);
      setFilteredEquipments(combinedData);
    }, []);
  
    const filterByName = (name: string) => {
      const filtered = equipments.filter((equipment) =>
        equipment.name.toLowerCase().includes(name.toLowerCase()),
      );
      setFilteredEquipments(filtered);
    };
  
    const filterByState = (stateName: string) => {
      const filtered = equipments.filter((equipment) => {
        const lastState =
          equipment.states.length > 0 ? equipment.states[0] : null;
  
        return lastState && lastState.equipmentState.name === stateName;
      });
  
      setFilteredEquipments(filtered);
    };
  
    const filterByModel = (modelName: string) => {
      const filtered = equipments.filter(
        (equipment) => equipment.equipmentModel?.name === modelName,
      );
      setFilteredEquipments(filtered);
    };
  
    const clearFilters = () => {
      getEquipmentData();
    };
  
    useEffect(() => {
      getEquipmentData();
    }, [getEquipmentData]);
  
    return (
      <EquipmentContext.Provider
        value={{
          equipments: filteredEquipments,
          filterByState,
          filterByModel,
          filterByName,
          clearFilters,
        }}
      >
        {children}
      </EquipmentContext.Provider>
    );
  };