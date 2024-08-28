import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext(undefined);

export const useData = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error("useData deve ser usado aninhado a um DataProvider");
  }

  return context;
};

export const DataProvider = ({ children }) => {
  const [equipmentPositionHistory, setEquipmentPositionHistory] = useState([]);
  const [equipmentBasicData, setEquipmentBasicData] = useState([]);
  const [equipmentModel, setEquipmentModel] = useState([]);
  const [equipmentState, setEquipmentState] = useState([]);
  const [equipmentStateHistory, setEquipmentStateHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipmentPositionHistoryData = async () => {
      try {
        const response = await fetch("/data/equipmentPositionHistory.json");
        const result = await response.json();
        setEquipmentPositionHistory(result);
      } catch (error) {
        setError(error);
      }
    };

    const fetchEquipmentBasicData = async () => {
      try {
        const response = await fetch("/data/equipment.json");
        const result = await response.json();
        setEquipmentBasicData(result);
      } catch (error) {
        setError(error);
      }
    };

    const fetchEquipmentModelData = async () => {
      try {
        const response = await fetch("/data/equipmentModel.json");
        const result = await response.json();
        setEquipmentModel(result);
      } catch (error) {
        setError(error);
      }
    };

    const fetchEquipmentStateData = async () => {
      try {
        const response = await fetch("/data/equipmentState.json");
        const result = await response.json();
        setEquipmentState(result);
      } catch (error) {
        setError(error);
      }
    };

    const fetchEquipmentStateHistoryData = async () => {
      try {
        const response = await fetch("/data/equipmentStateHistory.json");
        const result = await response.json();
        setEquipmentStateHistory(result);
      } catch (error) {
        setError(error);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchEquipmentPositionHistoryData(),
          fetchEquipmentBasicData(),
          fetchEquipmentModelData(),
          fetchEquipmentStateData(),
          fetchEquipmentStateHistoryData(),
        ]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        equipmentPositionHistory,
        equipmentBasicData,
        equipmentModel,
        equipmentState,
        equipmentStateHistory,
        loading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
