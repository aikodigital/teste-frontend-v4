import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { IEquipmentState } from '../models/EquipmentState';



interface StatusContextType {
  states: IEquipmentState[]
  loading: boolean,
}

// Criando o contexto com um valor inicial
const EquipmentStateContext = createContext<StatusContextType | undefined>(undefined);

// Criando o provider
export const EquipmentStateContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [states, setStates] = useState<IEquipmentState[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const fetchStatuses = async () => {
      try {
        const response = await fetch('data/equipmentState.json');
        const data : IEquipmentState[] = await response.json();
        setStates(data); 
        setLoading(false);   
      } catch (error: any) {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  return (
    <EquipmentStateContext.Provider value={{ states, loading }}>
      {children}
    </EquipmentStateContext.Provider>
  );
};

export default EquipmentStateContext;