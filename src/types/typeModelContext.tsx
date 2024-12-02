import { createContext } from "react";

export type typeModeloContext = { 
    modelo: {
        id:string;
        equipmentModelId: string;
        name: string;
    }[];

    setModelo: (
        modelo: {
            id:string;
            equipmentModelId: string;
            name: string;
        }[]
    ) => void;
}

const defaultValue: typeModeloContext = {
    modelo: [],
    setModelo: () => {}
};

export const ModeloContext = createContext<typeModeloContext>(defaultValue);

