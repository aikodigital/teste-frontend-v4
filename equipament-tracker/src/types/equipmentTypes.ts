export interface EquipmentPosition {
    id: string;
    lat: number;
    lon: number;
    date: string;
    equipmentName: string;
    stateName: string; // Nome do estado
    stateColor: string; // Cor do estado
    modelName: string; // Nome do modelo
}