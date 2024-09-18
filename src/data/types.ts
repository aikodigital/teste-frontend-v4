// Tipo para o estado do equipamento
export type EquipmentState = {
    id: string;
    name: string;
    color: string;
};

// Histórico de estados para um equipamento
export type EquipmentStateHistory = {
    equipmentId: string;
    states: {
        date: string;
        equipmentStateId: string;
    }[];
};

// Histórico de posições para um equipamento
export type EquipmentPositionHistory = {
    equipmentId: string;
    positions: {
        date: string;
        lat: number;
        lon: number;
    }[];
};


// Dados do equipamento
export interface Equipment {
    id: string;
    equipmentModelId: string;
    name: string;
}

// Modelo do equipamento
export interface EquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: { equipmentStateId: string; value: number }[];
}