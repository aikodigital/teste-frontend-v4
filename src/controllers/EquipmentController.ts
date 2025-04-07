import {
	EquipmentStatus,
	type Equipment,
	type EquipmentModel,
	type EquipmentPosition,
	type EquipmentPositionHistory,
	type EquipmentState,
	type EquipmentStateHistory,
} from "../models/EquipmentModel";
import { EquipmentService } from "../services/EquipmentService";

export class EquipmentController {
	private constructor(private readonly equipmentService: EquipmentService) {}

	private static instance: EquipmentController;
	private equipments: Array<Equipment> = [];
	private equipmentModels: Array<EquipmentModel> = [];
	private equipmentStates: Array<EquipmentState> = [];
	private equipmentStateHistory: Array<EquipmentStateHistory> = [];
	private equipmentPositionHistory: Array<EquipmentPositionHistory> = [];

	public static getInstance(): EquipmentController {
		if (!EquipmentController.instance) {
			EquipmentController.instance = new EquipmentController(
				new EquipmentService(),
			);
		}
		return EquipmentController.instance;
	}

	async initialize() {
		try {
			[
				this.equipments,
				this.equipmentModels,
				this.equipmentStates,
				this.equipmentStateHistory,
				this.equipmentPositionHistory,
			] = await Promise.all([
				this.equipmentService.getEquipments(),
				this.equipmentService.getEquipmentModels(),
				this.equipmentService.getEquipmentStates(),
				this.equipmentService.getEquipmentStateHistory(),
				this.equipmentService.getEquipmentPositionHistory(),
			]);
		} catch (error) {
			console.error("Error initializing equipment data:", error);
		}
	}

	getEquipments(): Equipment[] {
		return this.equipments;
	}

	getEquipmentById(id: string): Equipment | undefined {
		return this.equipments.find((equipment) => equipment.id === id);
	}

	getEquipmentModelById(id: string): EquipmentModel | undefined {
		return this.equipmentModels.find((model) => model.id === id);
	}

	getEquipmentStateById(id: string): EquipmentState | undefined {
		return this.equipmentStates.find((state) => state.id === id);
	}

	getEquipmentStateHistory(
		equipmentId: string,
	): EquipmentStateHistory | undefined {
		return this.equipmentStateHistory.find(
			(history) => history.equipmentId === equipmentId,
		);
	}

	getEquipmentPositionHistory(
		equipmentId: string,
	): EquipmentPositionHistory | undefined {
		return this.equipmentPositionHistory.find(
			(history) => history.equipmentId === equipmentId,
		);
	}

	getLatestPosition(equipmentId: string): EquipmentPosition | undefined {
		const equipmentPositionHistory =
			this.getEquipmentPositionHistory(equipmentId);
		if (
			!equipmentPositionHistory ||
			equipmentPositionHistory.positions.length === 0
		)
			return undefined;
		const length = equipmentPositionHistory.positions.length;
		return equipmentPositionHistory.positions[length - 1];
	}

	getCurrentState(equipmentId: string): EquipmentState | undefined {
		const equipmentStateHistory = this.getEquipmentStateHistory(equipmentId);
		if (!equipmentStateHistory || equipmentStateHistory.states.length === 0)
			return undefined;
		const length = equipmentStateHistory.states.length;
		const lastState = equipmentStateHistory.states[length - 1];
		return this.getEquipmentStateById(lastState.equipmentStateId);
	}

	calculateProductivity(equipmentId: string): number {
		const stateHistory = this.getEquipmentStateHistory(equipmentId)?.states;
		if (!stateHistory || stateHistory.length === 0) return 0;

		const operatingState = this.equipmentStates.find(
			(state) => state.name === EquipmentStatus.OPERATING,
		);

		if (!operatingState) return 0;

		if (stateHistory.length === 1) {
			return stateHistory[0].equipmentStateId === operatingState.id ? 100 : 0;
		}

		const sortedStates = [...stateHistory].sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
		);

		let operatingTime = 0;
		let totalTime = 0;

		for (let i = 0; i < sortedStates.length - 1; i++) {
			const currentState = sortedStates[i];
			const nextState = sortedStates[i + 1];

			const duration =
				new Date(nextState.date).getTime() -
				new Date(currentState.date).getTime();
			totalTime += duration;

			if (currentState.equipmentStateId === operatingState.id) {
				operatingTime += duration;
			}
		}

		return totalTime > 0
			? Number.parseFloat(((operatingTime / totalTime) * 100).toFixed(2))
			: 0;
	}

	calculateEarnings(equipmentId: string): number {
		const equipment = this.getEquipmentById(equipmentId);
		if (!equipment) return 0;

		const model = this.getEquipmentModelById(equipment.equipmentModelId);
		if (!model) return 0;

		const stateHistory = this.getEquipmentStateHistory(equipmentId);
		if (!stateHistory || stateHistory.states.length < 2) return 0;

		let totalEarnings = 0;
		const sortedStates = [...stateHistory.states].sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
		);

		for (let i = 0; i < sortedStates.length - 1; i++) {
			const currentState = sortedStates[i];
			const nextState = sortedStates[i + 1];

			const hourlyRate =
				model.hourlyEarnings.find(
					(earning) =>
						earning.equipmentStateId === currentState.equipmentStateId,
				)?.value || 0;

			const startTime = new Date(currentState.date).getTime();
			const endTime = new Date(nextState.date).getTime();
			const durationHours = (endTime - startTime) / (1000 * 60 * 60);

			totalEarnings += hourlyRate * durationHours;
		}

		return Number.parseFloat(totalEarnings.toFixed(2));
	}
}
