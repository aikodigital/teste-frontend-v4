// import { createContext } from "react";

export type typeModeloContext = { 
    // modelo: string[];
    modelo: {
        id:string;
        equipmentModelId: string;
        name: string;
    }[];
    // setModelo: (modelo: string[]) => void;

    setModelo: (
        modelo: {
            id:string;
            equipmentModelId: string;
            name: string;
        }[]
    ) => void;
}

export const defaultValue: typeModeloContext = {
    modelo: [],
    setModelo: () => {}
};

// export const ModeloContext = createContext<typeModeloContext>(defaultValue);

