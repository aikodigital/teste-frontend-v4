import {
  getLatestPosition,
  getLatestState,
  processEquipmentData,
} from "./equipment.adapter";

describe("equipment adapter", () => {
  describe("get latest position", () => {
    it("should return the latest position based on date", () => {
      const mockPositionHistory = {
        equipmentId: "001",
        positions: [
          { date: "2024-01-01T12:00:00Z", lat: 10, lon: 20 },
          { date: "2024-02-01T12:00:00Z", lat: 15, lon: 25 },
        ],
      };

      const result = getLatestPosition(mockPositionHistory);
      expect(result).toEqual({
        date: "2024-02-01T12:00:00Z",
        lat: 15,
        lon: 25,
      });
    });

    it("should handle a single position correctly", () => {
      const mockPositionHistory = {
        equipmentId: "001",
        positions: [{ date: "2024-01-01T12:00:00Z", lat: 10, lon: 20 }],
      };

      const result = getLatestPosition(mockPositionHistory);
      expect(result).toEqual({
        date: "2024-01-01T12:00:00Z",
        lat: 10,
        lon: 20,
      });
    });
  });

  describe("get latest state", () => {
    it("should return the latest state based on date", () => {
      const mockStateHistory = {
        equipmentId: "001",
        states: [
          { date: "2024-01-01T12:00:00Z", equipmentStateId: "1" },
          { date: "2024-02-01T12:00:00Z", equipmentStateId: "2" },
        ],
      };

      const mockEquipmentStates = [
        { id: "1", name: "Idle", color: "blue" },
        { id: "2", name: "Running", color: "green" },
      ];

      const result = getLatestState(mockStateHistory, mockEquipmentStates);
      expect(result).toEqual({ id: "2", name: "Running", color: "green" });
    });

    it("should return undefined if no matching state is found", () => {
      const mockStateHistory = {
        equipmentId: "001",
        states: [{ date: "2024-01-01T12:00:00Z", equipmentStateId: "3" }],
      };

      const mockEquipmentStates = [
        { id: "1", name: "Idle", color: "blue" },
        { id: "2", name: "Running", color: "green" },
      ];

      const result = getLatestState(mockStateHistory, mockEquipmentStates);
      expect(result).toBeUndefined();
    });
  });

  describe("process equipment data", () => {
    it("should process equipment data correctly", () => {
      const mockEquipments = [
        { id: "1", name: "Excavator", equipmentModelId: "101" },
      ];

      const mockEquipmentModels = [
        { id: "101", name: "Model X", hourlyEarnings: [] },
      ];

      const mockEquipmentStates = [
        { id: "201", name: "Idle", color: "blue" },
        { id: "202", name: "Running", color: "green" },
      ];

      const mockStateHistory = [
        {
          equipmentId: "1",
          states: [{ date: "2024-02-01T12:00:00Z", equipmentStateId: "202" }],
        },
      ];

      const mockPositionHistory = [
        {
          equipmentId: "1",
          positions: [{ date: "2024-02-01T12:00:00Z", lat: 50, lon: 60 }],
        },
      ];

      const result = processEquipmentData(
        mockEquipments,
        mockEquipmentModels,
        mockEquipmentStates,
        mockStateHistory,
        mockPositionHistory,
      );

      expect(result).toEqual([
        {
          id: "1",
          name: "Excavator",
          model: "Model X",
          position: { lat: 50, lon: 60 },
          state: { id: "202", name: "Running", color: "green" },
          equipmentModel: { id: "101", name: "Model X", hourlyEarnings: [] },
          stateHistory: mockStateHistory[0],
          positionHistory: mockPositionHistory[0],
        },
      ]);
    });

    it("should handle missing position and state data gracefully", () => {
      const mockEquipments = [
        { id: "1", name: "Excavator", equipmentModelId: "101" },
      ];

      const mockEquipmentModels = [
        { id: "101", name: "Model X", hourlyEarnings: [] },
      ];

      const result = processEquipmentData(
        mockEquipments,
        mockEquipmentModels,
        [],
        [],
        [],
      );

      expect(result).toEqual([
        {
          id: "1",
          name: "Excavator",
          model: "Model X",
          position: { lat: 0, lon: 0 },
          state: { id: undefined, name: undefined, color: undefined },
          equipmentModel: { id: "101", name: "Model X", hourlyEarnings: [] },
          stateHistory: undefined,
          positionHistory: undefined,
        },
      ]);
    });
  });
});
