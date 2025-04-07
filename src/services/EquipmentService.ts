import axios from "axios";
import type {
	Equipment,
	EquipmentModel,
	EquipmentPositionHistory,
	EquipmentState,
	EquipmentStateHistory,
} from "../models/EquipmentModel";

export class EquipmentService {
	private baseUrl = "/data";

	private async getData<T>(route: string): Promise<T[]> {
		const response = await axios.get(`${this.baseUrl}/${route}.json`);
		return response.data;
	}

	async getEquipments(): Promise<Equipment[]> {
		return this.getData<Equipment>("equipment");
	}

	async getEquipmentModels(): Promise<EquipmentModel[]> {
		return this.getData<EquipmentModel>("equipmentModel");
	}

	async getEquipmentStates(): Promise<EquipmentState[]> {
		return this.getData<EquipmentState>("equipmentState");
	}

	async getEquipmentStateHistory(): Promise<EquipmentStateHistory[]> {
		return this.getData<EquipmentStateHistory>("equipmentStateHistory");
	}

	async getEquipmentPositionHistory(): Promise<EquipmentPositionHistory[]> {
		return this.getData<EquipmentPositionHistory>("equipmentPositionHistory");
	}
}
