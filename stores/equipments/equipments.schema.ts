import type { IEquipment, IEquipmentState, IEquipmentModel, IEquipmentPosition, IEquipmentStateHistory, IPosition } from '~/@types';

export interface IState {
	equipments: IEquipment[];
	states: IEquipmentState[];
	models: IEquipmentModel[];
	positions: IEquipmentPosition[];
	stateHistory: IEquipmentStateHistory[];
	selectedEquipment: IEquipmentsWithMoreInfos | null;
	filters: IFilters;
}

export interface IEquipmentsWithMoreInfos extends IEquipment {
	model?: IEquipmentModel;
	last_position: IPosition;
	last_state: ILastState;
}

export interface IFilters {
	name?: string;
	models?: string[];
	states?: string[];
}

export interface ILastState {
	date: string;
	equipmentStateId: string;
	type: IEquipmentState;
}
