import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import {
    fetchEquipmentList,
    fetchEquipmentModelList,
    fetchEquipmentPositions,
    fetchEquipmentStatesInfo,
    fetchEquipmentStatesHistory
} from '../api/api';
import { Equipment, EquipmentModel, EquipmentPosition, EquipmentStateInfo, EquipmentStateHistory } from '../types';

interface EquipmentDataContextProps {
    equipmentList: Equipment[];
    equipmentModelList: EquipmentModel[];
    equipmentPositions: EquipmentPosition[];
    equipmentStatesInfoList: EquipmentStateInfo[];
    equipmentStatesHistory: EquipmentStateHistory[];
    loading: boolean;
}

const EquipmentDataContext = createContext<EquipmentDataContextProps | undefined>(undefined);

export const useEquipmentData = () => {
    const context = useContext(EquipmentDataContext);
    if (!context) {
        throw new Error('useEquipmentData deve ser usado dentro de um EquipmentDataProvider');
    }
    return context;
};

interface EquipmentDataProviderProps {
    children: ReactNode;
}

export const EquipmentDataProvider: React.FC<EquipmentDataProviderProps> = ({ children }) => {
    const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
    const [equipmentModelList, setEquipmentModelList] = useState<EquipmentModel[]>([]);
    const [equipmentPositions, setEquipmentPositions] = useState<EquipmentPosition[]>([]);
    const [equipmentStatesInfoList, setEquipmentStatesInfoList] = useState<EquipmentStateInfo[]>([]);
    const [equipmentStatesHistory, setEquipmentStatesHistory] = useState<EquipmentStateHistory[]>([]);
    const [loading, setLoading] = useState(true);

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