export enum EquipmentStatus {
	OPERATING = "Operando",
	MAINTENANCE = "Manutenção",
	STOPPED = "Parado",
}

export enum EquipmentType {
	TRUCK = "Caminhão de carga",
	HARVESTER = "Harvester",
	TRACTOR = "Garra traçadora",
}

export type Equipment = {
	id: string;
	equipmentModelId: string;
	name: string;
};

export type EquipmentModel = {
	id: string;
	name: string;
	hourlyEarnings: Array<HourlyEarning>;
};

export type HourlyEarning = {
	equipmentStateId: string;
	value: number;
};

export type EquipmentState = {
	id: string;
	name: EquipmentStatus;
	color: string;
};

export type EquipmentStateHistory = {
	equipmentId: string;
	states: Array<{
		date: string;
		equipmentStateId: string;
	}>;
};

export type EquipmentPosition = {
	date: string;
	lat: number;
	lon: number;
};

export type EquipmentPositionHistory = {
	equipmentId: string;
	positions: Array<EquipmentPosition>;
};
