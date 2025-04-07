// biome-ignore lint/style/useImportType: <explanation>
import {
	Equipment,
	EquipmentModel,
	EquipmentState,
	EquipmentStateHistory,
	EquipmentPositionHistory,
	EquipmentStatus,
	EquipmentType,
} from "../../models/EquipmentModel";
import { EquipmentController } from "../EquipmentController";

describe("EquipmentController", () => {
	let controller: EquipmentController;
	let mockEquipments: Equipment[];
	let mockEquipmentModels: EquipmentModel[];
	let mockEquipmentStates: EquipmentState[];
	let mockStateHistory: EquipmentStateHistory[];
	let mockPositionHistory: EquipmentPositionHistory[];

	beforeEach(() => {
		controller = EquipmentController.getInstance();

		mockEquipments = [
			{
				id: "1",
				name: EquipmentType.TRUCK,
				equipmentModelId: "model1",
			},
		];

		mockEquipmentModels = [
			{
				id: "model1",
				name: "Heavy Truck",
				hourlyEarnings: [
					{ equipmentStateId: "state1", value: 100 },
					{ equipmentStateId: "state2", value: 50 },
				],
			},
		];

		mockEquipmentStates = [
			{
				id: "state1",
				name: EquipmentStatus.OPERATING,
				color: "#00ff00",
			},
			{
				id: "state2",
				name: EquipmentStatus.STOPPED,
				color: "#ff0000",
			},
		];

		mockStateHistory = [
			{
				equipmentId: "1",
				states: [
					{
						equipmentStateId: "state1",
						date: new Date("2024-01-01T10:00:00").toISOString(),
					},
					{
						equipmentStateId: "state2",
						date: new Date("2024-01-01T11:00:00").toISOString(),
					},
				],
			},
		];

		mockPositionHistory = [
			{
				equipmentId: "1",
				positions: [
					{
						lat: -23.5505,
						lon: -46.6333,
						date: new Date("2024-01-01T10:00:00").toISOString(),
					},
				],
			},
		];

		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		controller["equipments"] = mockEquipments;
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		controller["equipmentModels"] = mockEquipmentModels;
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		controller["equipmentStates"] = mockEquipmentStates;
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		controller["equipmentStateHistory"] = mockStateHistory;
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		controller["equipmentPositionHistory"] = mockPositionHistory;
	});

	describe("getEquipments", () => {
		it("should return all equipments", async () => {
			const equipments = await controller.getEquipments();
			expect(equipments).toEqual(mockEquipments);
		});
	});

	describe("getEquipmentById", () => {
		it("should return equipment when found", () => {
			const equipment = controller.getEquipmentById("1");
			expect(equipment).toEqual(mockEquipments[0]);
		});

		it("should return undefined when equipment not found", () => {
			const equipment = controller.getEquipmentById("non-existent");
			expect(equipment).toBeUndefined();
		});
	});

	describe("getEquipmentModelById", () => {
		it("should return model when found", () => {
			const model = controller.getEquipmentModelById("model1");
			expect(model).toEqual(mockEquipmentModels[0]);
		});

		it("should return undefined when model not found", () => {
			const model = controller.getEquipmentModelById("non-existent");
			expect(model).toBeUndefined();
		});
	});

	describe("getEquipmentStateById", () => {
		it("should return state when found", () => {
			const state = controller.getEquipmentStateById("state1");
			expect(state).toEqual(mockEquipmentStates[0]);
		});

		it("should return undefined when state not found", () => {
			const state = controller.getEquipmentStateById("non-existent");
			expect(state).toBeUndefined();
		});
	});

	describe("getEquipmentStateHistory", () => {
		it("should return state history when found", () => {
			const history = controller.getEquipmentStateHistory("1");
			expect(history).toEqual(mockStateHistory[0]);
		});

		it("should return undefined when history not found", () => {
			const history = controller.getEquipmentStateHistory("non-existent");
			expect(history).toBeUndefined();
		});
	});

	describe("getEquipmentPositionHistory", () => {
		it("should return position history when found", () => {
			const history = controller.getEquipmentPositionHistory("1");
			expect(history).toEqual(mockPositionHistory[0]);
		});

		it("should return undefined when history not found", () => {
			const history = controller.getEquipmentPositionHistory("non-existent");
			expect(history).toBeUndefined();
		});
	});

	describe("getLatestPosition", () => {
		it("should return latest position when available", () => {
			const position = controller.getLatestPosition("1");
			expect(position).toEqual(mockPositionHistory[0].positions[0]);
		});

		it("should return null when no positions available", () => {
			const position = controller.getLatestPosition("non-existent");
			expect(position).toBeUndefined();
		});
	});

	describe("getCurrentState", () => {
		it("should return current state when available", () => {
			const state = controller.getCurrentState("1");
			expect(state).toEqual(mockEquipmentStates[1]);
		});

		it("should return null when no state history available", () => {
			const state = controller.getCurrentState("non-existent");
			expect(state).toBeUndefined();
		});
	});
	describe("calculateProductivity", () => {
		it("should calculate productivity correctly for operating equipment", () => {
			const specificStateHistory = {
				equipmentId: "1",
				states: [
					{
						equipmentStateId: "state1",
						date: new Date("2024-01-01T08:00:00").toISOString(),
					},
					{
						equipmentStateId: "state2",
						date: new Date("2024-01-01T10:00:00").toISOString(),
					},
					{
						equipmentStateId: "state1",
						date: new Date("2024-01-01T11:00:00").toISOString(),
					},
				],
			};

			jest
				.spyOn(controller, "getEquipmentStateHistory")
				.mockReturnValueOnce(specificStateHistory);

			const productivity = controller.calculateProductivity("1");

			expect(productivity).toBe(66.67);
		});

		it("should return 0 when no state history available", () => {
			jest
				.spyOn(controller, "getEquipmentStateHistory")
				.mockReturnValueOnce(undefined);

			const productivity = controller.calculateProductivity("non-existent");

			expect(productivity).toBe(0);
		});

		it("should handle equipment with only one state entry", () => {
			const singleStateHistory = {
				equipmentId: "1",
				states: [
					{
						equipmentStateId: "state1",
						date: new Date("2024-01-01T08:00:00").toISOString(),
					},
				],
			};

			jest
				.spyOn(controller, "getEquipmentStateHistory")
				.mockReturnValueOnce(singleStateHistory);

			const productivity = controller.calculateProductivity("1");

			expect(productivity).toBe(100);
		});
	});

	describe("calculateEarnings", () => {
		it("should calculate earnings correctly based on state history and hourly rates", () => {
			const specificStateHistory = {
				equipmentId: "1",
				states: [
					{
						equipmentStateId: "state1",
						date: new Date("2024-01-01T08:00:00").toISOString(),
					},
					{
						equipmentStateId: "state2",
						date: new Date("2024-01-01T10:00:00").toISOString(),
					},
				],
			};

			jest
				.spyOn(controller, "getEquipmentStateHistory")
				.mockReturnValueOnce(specificStateHistory);
			jest
				.spyOn(controller, "getEquipmentById")
				.mockReturnValueOnce(mockEquipments[0]);

			const earnings = controller.calculateEarnings("1");

			expect(earnings).toBe(200);
		});

		it("should return 0 when equipment not found", () => {
			jest.spyOn(controller, "getEquipmentById").mockReturnValueOnce(undefined);

			const earnings = controller.calculateEarnings("non-existent");

			expect(earnings).toBe(0);
		});

		it("should handle multiple state changes with different hourly rates", () => {
			const mixedStateHistory = {
				equipmentId: "1",
				states: [
					{
						equipmentStateId: "state1",
						date: new Date("2024-01-01T08:00:00").toISOString(),
					},
					{
						equipmentStateId: "state2",
						date: new Date("2024-01-01T09:00:00").toISOString(),
					},
					{
						equipmentStateId: "state1",
						date: new Date("2024-01-01T10:00:00").toISOString(),
					},
				],
			};

			jest
				.spyOn(controller, "getEquipmentStateHistory")
				.mockReturnValueOnce(mixedStateHistory);
			jest
				.spyOn(controller, "getEquipmentById")
				.mockReturnValueOnce(mockEquipments[0]);

			const earnings = controller.calculateEarnings("1");

			expect(earnings).toBe(150);
		});
	});
});
