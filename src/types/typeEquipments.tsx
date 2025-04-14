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

export type EquipmentIdModelos = {
    modelEquipment: string;
    datePosition: string;
}

export type typeIdModelos = {
    equipamentoId: EquipmentIdModelos;
    // setEquipamentoId: (update: Partial<typeof modeloEquipament>) => typeIdModelos;
    setEquipamentoId: (
        equipamentoId: EquipmentIdModelos
    ) => void;
}

export const defaultValueId: typeIdModelos = {
    equipamentoId: {
        modelEquipment: "",
        datePosition: ""
    },
    // equipamentoId: {
    //     modelEquipment: "CA-0001",
    //     datePosition: "2021-02-01T15:00:00.000Z"
    // },
    setEquipamentoId: () => {}
};