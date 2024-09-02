import React, { createContext, useContext, useState } from 'react';

interface EquipmentContextProps {
    selectedEquipmentId: string | null;
    handleEquipmentClick: (equipmentId: string) => void;
}

const EquipmentContext = createContext<EquipmentContextProps | undefined>(undefined);

export const useEquipment = () => {
    const context = useContext(EquipmentContext);
    if (!context) {
        throw new Error('Utilize useEquipment dentro de um EquipmentProvider.');
    }
    return context;
};

export const EquipmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);

    const handleEquipmentClick = (equipmentId: string) => {
        setSelectedEquipmentId(equipmentId);
    };

    return (
        <EquipmentContext.Provider value={{ selectedEquipmentId, handleEquipmentClick }}>
            {children}
        </EquipmentContext.Provider>
    );
};
