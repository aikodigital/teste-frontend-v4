import { createContext } from "react";
import { typeModeloContext } from "../types/typeModelContext";
import typeEquipments from "../types/typeEquipments";

export const modeloContext = createContext({} as typeModeloContext);
export const equipmentId = createContext({} as typeEquipments)
