"use client"

import { createContext, useContext, useState } from "react";

interface EquipmentContextType {
  equipmentState: { [key: string]: string };
  setEquipmentState: (id: string, stateId: string) => void;
}

const EquipmentContext = createContext<EquipmentContextType | undefined>(
  undefined
);

export const EquipmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [equipmentState, setEquipmentStateInternal] = useState<{
    [key: string]: string;
  }>({});

  const setEquipmentState = (id: string, stateId: string) => {
    setEquipmentStateInternal((prev) => ({
      ...prev,
      [id]: stateId,
    }));
  };

  return (
    <EquipmentContext.Provider value={{ equipmentState, setEquipmentState }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export const useEquipmentContext = () => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error(
      "useEquipmentContext must be used within an EquipmentProvider"
    );
  }
  return context;
};