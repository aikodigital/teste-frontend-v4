import React, { createContext, ReactNode, useContext, useState } from "react";

interface EquipmentDetailsContextProps {
  selectedEquipment: Equipment;
  setSelectedEquipment: (equipment: Equipment) => void;
}

const EquipmentDetailsContext = createContext<
  EquipmentDetailsContextProps | undefined
>(undefined);

export const useEquipmentDetailsContext = (): EquipmentDetailsContextProps => {
  const context = useContext(EquipmentDetailsContext);
  if (!context) {
    throw new Error(
      "useEquipmentDetailsContext must be used within a EquipmentDetailsProvider",
    );
  }
  return context;
};

export const EquipmentDetailsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment>(
    {} as Equipment,
  );

  return (
    <EquipmentDetailsContext.Provider
      value={{
        selectedEquipment,
        setSelectedEquipment,
      }}
    >
      {children}
    </EquipmentDetailsContext.Provider>
  );
};
