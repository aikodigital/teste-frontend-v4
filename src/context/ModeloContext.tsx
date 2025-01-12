import { createContext } from "react";
import { typeModeloContext } from "../types/typeModelContext";
import { typeEquipments, typeIdModelos } from "../types/typeEquipments";

export type typeWorkedHours = {
    worked: {
        id: string;
        name: string;
        hourlyEarnings: {
            equipmentStateId: string;
            value: number;
            }[]
        }[]
    
    setWorked: (
        worked: {
            id: string;
            name: string;
            hourlyEarnings: {
                equipmentStateId: string;
                value: number;
                }[]
            }[]
        ) => void;
    }

export const defaultValueWorked: typeWorkedHours = {
    worked: [],
    setWorked: () => {},
}

export type typeStateEquipment = {
    stateEquipment: {
        id: string;
        name: string;
        color: string;
    }[]

    setStateEquipment: (
        stateEquipment: {
            id: string;
            name: string;
            color: string;
        }[]
    ) => void;
}

export const defaultValueStateEquipment: typeStateEquipment = {
    stateEquipment: [],
    setStateEquipment: () => {},
}

export type typeEquipamentHistory = {
    equipmentHistory: {
        equipmentId: string;
        states: {
            date: string;
            equipmentStateId: string;
        }[]
    }[]

    setEquipmentHistory: (
        equipmentHistory: {
            equipmentId: string;
            states: {
                date: string;
                equipmentStateId: string;
            }[]
        }[]
    ) => void;
}

export const defaultValueEquipamentHistory: typeEquipamentHistory = {
    equipmentHistory: [],
    setEquipmentHistory: () => {},
}

export const modeloContext = createContext({} as typeModeloContext);
export const position = createContext({} as typeEquipments);
export const modeloEquipament = createContext({} as typeIdModelos);
export const horasTrabalhadas = createContext({} as typeWorkedHours);
export const estadoEquipamento = createContext({} as typeStateEquipment);
export const historicoEquipamento = createContext({} as typeEquipamentHistory);
