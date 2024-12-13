export type typeEquipments = {
    positions: {
        equipmentId: string;
        positions: {
            date: string;
            lat: number;
            lon: number;
        }[];
    }[];
    

    setPositions: (
        positions: {
            equipmentId: string,
            positions: {
                date: string;
                lat: number;
                lon: number;
        }[];
    }[]) => void;
}

export const defaultValue: typeEquipments = {
    positions: [],
    setPositions: () => {},
};

export type typeIdModelos = {
    equipamentoId: string;
    setEquipamentoId: (equipamentoId: string) => void;
}

export const defaultValueId: typeIdModelos = {
    equipamentoId: "",
    setEquipamentoId: () => {},
};