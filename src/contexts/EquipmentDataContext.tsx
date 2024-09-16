import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
    fetchEquipmentList,
    fetchEquipmentModelList,
    fetchEquipmentPositions,
    fetchEquipmentStatesInfo,
    fetchEquipmentStatesHistory
} from '../api/api'; // Importa as funções que simulam chamadas de API
import { Equipment, EquipmentModel, EquipmentPosition, EquipmentStateInfo, EquipmentStateHistory } from '../types';

// Define a interface do contexto
interface EquipmentDataContextProps {
    equipmentList: Equipment[];
    equipmentModelList: EquipmentModel[];
    equipmentPositions: EquipmentPosition[];
    equipmentStatesInfoList: EquipmentStateInfo[];
    equipmentStatesHistory: EquipmentStateHistory[];
    loading: boolean;
}

// Cria o contexto
const EquipmentDataContext = createContext<EquipmentDataContextProps | undefined>(undefined);

// Hook customizado para usar o contexto
export const useEquipmentData = () => {
    const context = useContext(EquipmentDataContext);
    if (!context) {
        throw new Error('useEquipmentData deve ser usado dentro de um EquipmentDataProvider');
    }
    return context;
};

// Define a interface para o provedor do contexto, garantindo que `children` seja do tipo `ReactNode`
interface EquipmentDataProviderProps {
    children: ReactNode;
}

// Componente provider
export const EquipmentDataProvider: React.FC<EquipmentDataProviderProps> = ({ children }) => {
    const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
    const [equipmentModelList, setEquipmentModelList] = useState<EquipmentModel[]>([]);
    const [equipmentPositions, setEquipmentPositions] = useState<EquipmentPosition[]>([]);
    const [equipmentStatesInfoList, setEquipmentStatesInfoList] = useState<EquipmentStateInfo[]>([]);
    const [equipmentStatesHistory, setEquipmentStatesHistory] = useState<EquipmentStateHistory[]>([]);
    const [loading, setLoading] = useState(true);

    // Função para carregar os dados simulados
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const equipmentData = await fetchEquipmentList() as Equipment[];
                const modelData = await fetchEquipmentModelList() as EquipmentModel[];
                const positionsData = await fetchEquipmentPositions() as EquipmentPosition[];
                const statesInfoData = await fetchEquipmentStatesInfo() as EquipmentStateInfo[];
                const statesHistoryData = await fetchEquipmentStatesHistory() as EquipmentStateHistory[];

                setEquipmentList(equipmentData);
                setEquipmentModelList(modelData);
                setEquipmentPositions(positionsData);
                setEquipmentStatesInfoList(statesInfoData);
                setEquipmentStatesHistory(statesHistoryData);
            } catch (error) {
                console.error('Erro ao carregar os dados', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <EquipmentDataContext.Provider
            value={{
                equipmentList,
                equipmentModelList,
                equipmentPositions,
                equipmentStatesInfoList,
                equipmentStatesHistory,
                loading
            }}
        >
            {children}
        </EquipmentDataContext.Provider>
    );
};