export interface EquipmentStateI {
    date: string;  // ou use `Date` se quiser trabalhar com objetos Date diretamente
    equipmentStateId: string;
  }
  
  export interface EquipmentI {
    equipmentId: string;
    states: EquipmentStateI[];
  }

  export interface EquipmentStatusI {
    id: string;
    name: string;
    color: string;
  }

  export interface EquipmentPositionI {
    date: string;
    lat: number;
    lon: number;
  }

  export interface EquipmentPositionHistoryI {
    equipmentId: string;
    positions: EquipmentPositionI[];
  }

  export interface HourlyEarningI {
    equipmentStateId: string;
    value: number;
  }

  export interface EquipmentModelI {
    id: string;
    name: string;
    hourlyEarnings: HourlyEarningI[];
  }
  export interface EquipmentViewI {
    id: string;
    lat: number,
    lon: number,
    modelName: string,
    name: string, // Adicione o nome do equipamento
    icon: any,
    state: {
        name: string
        id: string
    },
  }

  export interface EquipmentStatusViewI {
    id: string;
    name: string;
    color: string;
    date: string;
    equipmentStateId:string;
  }