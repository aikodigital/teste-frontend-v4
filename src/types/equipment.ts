export type EquipmentModels = "Caminhão de carga" | "Harvester" | "Garra traçadora";

export type Equipment = {
  id: string;
  name: string;
  model: EquipmentModels;
  position: {
    date: string;
    lat: number;
    lon: number;
  };
  state: string;
  stateColor: string;
  stateHistory: {
    date: string;
    lat: number;
    lon: number;
  }[];
};