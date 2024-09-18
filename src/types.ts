// Tipagem para uma posição geográfica
export type Position = {
  lat: number;
  lon: number;
  date: string;
};

// Tipagem para um equipamento
export type Equipment = {
  id: string;
  name: string;
  equipmentModelId: string;
};

// Tipagem para o estado de um equipamento
export type EquipmentState = {
  id: string;
  name: string;
  color: string;
};

// Tipagem para o histórico de posições de um equipamento
export type EquipmentPositionHistory = {
  equipmentId: string;
  positions: Position[];
};

// Tipagem para o histórico de estados de um equipamento
export type EquipmentStateHistory = {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
};

// Tipagem para o modelo de equipamento
export type EquipmentModel = {
  id: string;
  name: string;
  hourlyEarnings: {
    equipmentStateId: string;
    value: number;
  }[];
};

// Tipagem para um filtro de posição
export type PositionFilter = {
  startDate: string;
  endDate: string;
};

// Tipagem para uma posição com estado associado (para uso após filtragem)
export type PositionWithState = Position & {
  stateId: string | null;
};

// Tipagem para o estado do contexto de equipamentos
export interface EquipmentContextProps {
  equipments: Equipment[];
  positions: EquipmentPositionHistory[];
  states: EquipmentState[];
  stateHistories: EquipmentStateHistory[];
  selectedEquipment: Equipment | null;
  setSelectedEquipment: React.Dispatch<React.SetStateAction<Equipment | null>>;
  equipmentPositions: EquipmentPositionHistory[];
  filteredPositions: PositionWithState[];
  setFilteredPositions: React.Dispatch<React.SetStateAction<PositionWithState[]>>;
  setPositionFilter: React.Dispatch<React.SetStateAction<PositionFilter | null>>;
}
