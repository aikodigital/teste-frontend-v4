export interface IEquipment {
	id: string;
	equipmentModelId: string;
	name: string;
}

export interface IEquipmentModel {
	id: string;
	name: string;
	hourlyEarnings: IHourlyEarnings[];
}

export interface IHourlyEarnings {
	equipmentStateId: string;
	value: number;
}

export interface IEquipmentPosition {
	equipmentId: string;
	positions: IPosition[];
}

export interface IPosition {
	date: string;
	lat: number;
	lon: number;
}

export interface IEquipmentState {
	id: string;
	name: string;
	color: string;
}

export interface IEquipmentStateHistory {
	equipmentId: string;
	states: {
		date: string;
		equipmentStateId: string;
	}[];
}
