export interface IEquipmentPositionService {
  fetchAllEquipmentsPositions(): Promise<IEquipmentPosition[]>;
  fetchEquipmentPosition(
    equipmentId: string
  ): Promise<IEquipmentPositionHistory | null>;
}

export interface IEquipmentPositionHistory {
  equipmentId: string;
  positions: IPosition[];
}

export interface IEquipmentPosition {
  equipmentId: string;
  position: IPosition | null;
}

export interface IPosition {
  date: Date;
  lat: number;
  lon: number;
}
