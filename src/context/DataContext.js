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
  const [equipmentPositionHistory, setEquipmentPositionHistory] = useState({});
  const [equipmentBasicData, setEquipmentBasicData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipmentPositionHistoryData = async () => {
      try {
        const response = await fetch("/data/equipmentPositionHistory.json");
        const result = await response.json();
        setEquipmentPositionHistory(result);
      } catch (err) {
        setError(err);
      }
    };

    const fetchEquipmentBasicDataData = async () => {
      try {
        const response = await fetch("/data/equipment.json");
        const result = await response.json();
        setEquipmentBasicData(result);
      } catch (err) {
        setError(err);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchEquipmentPositionHistoryData(), fetchEquipmentBasicDataData()]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <DataContext.Provider value={{ equipmentPositionHistory, equipmentBasicData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
