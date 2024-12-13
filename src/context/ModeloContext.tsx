import { createContext } from "react";
import { typeModeloContext } from "../types/typeModelContext";
import { typeEquipments, typeIdModelos } from "../types/typeEquipments";

export const modeloContext = createContext({} as typeModeloContext);
export const position = createContext({} as typeEquipments)
export const modeloEquipament = createContext({} as typeIdModelos)
