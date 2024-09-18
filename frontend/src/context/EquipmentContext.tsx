import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TypeEquipmentBasic } from "@/types/equipmentTypes";

interface EquipmentContextType {
  selectedEquipment: TypeEquipmentBasic | null;
  setSelectedEquipment: (equipment: TypeEquipmentBasic | null) => void;
}

const EquipmentContext = createContext<EquipmentContextType | undefined>(undefined);

export const EquipmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<TypeEquipmentBasic | null>(null);

  return (
    <EquipmentContext.Provider value={{ selectedEquipment, setSelectedEquipment }}>
      {children}
    </EquipmentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEquipment = () => {
  const context = useContext(EquipmentContext);
  if (context === undefined) {
    throw new Error("useEquipment must be used within an EquipmentProvider");
  }
  return context;
};