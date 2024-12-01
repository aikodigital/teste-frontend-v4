import { renderHook } from "@testing-library/react-hooks";
import { EquipmentService } from "@/services/equipment.service";
import { useAllData } from "./use-all-data.hook";

jest.mock("@/services/equipment.service.ts", () => ({
  EquipmentService: {
    getEquipments: jest.fn(),
    getEquipmentModels: jest.fn(),
    getEquipmentStates: jest.fn(),
    getEquipmentStateHistory: jest.fn(),
    getEquipmentPositionHistory: jest.fn(),
  },
}));

describe("use all data", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clean mocks after each test
  });

  it("should fetch data correctly when equipment exists", async () => {
    const mockEquipments = [
      { id: "1", name: "Equipamento 1", equipmentModelId: "1" },
    ];
    const mockEquipmentModels = [{ id: "1", name: "Modelo 1" }];
    const mockEquipmentStates = [{ id: "1", name: "Operando", color: "Green" }];
    const mockEquipmentStateHistory = [
      {
        equipmentId: "1",
        states: [{ date: "2024-01-01", equipmentStateId: "1" }],
      },
    ];
    const mockEquipmentPositionHistory = [
      { equipmentId: "1", positions: [{ date: "2024-01-01", lat: 0, lon: 0 }] },
    ];

    (EquipmentService.getEquipments as jest.Mock).mockResolvedValue(
      mockEquipments,
    );
    (EquipmentService.getEquipmentModels as jest.Mock).mockResolvedValue(
      mockEquipmentModels,
    );
    (EquipmentService.getEquipmentStates as jest.Mock).mockResolvedValue(
      mockEquipmentStates,
    );
    (EquipmentService.getEquipmentStateHistory as jest.Mock).mockResolvedValue(
      mockEquipmentStateHistory,
    );
    (
      EquipmentService.getEquipmentPositionHistory as jest.Mock
    ).mockResolvedValue(mockEquipmentPositionHistory);

    const { result, waitForNextUpdate } = renderHook(() => useAllData("1"));
    await waitForNextUpdate();

    expect(result.current.allData).toEqual([
      {
        id: "1",
        name: "Equipamento 1",
        model: "Modelo 1",
        position: { lat: 0, lon: 0 },
        state: { id: "1", name: "Operando", color: "Green" },
        equipmentModel: { id: "1", name: "Modelo 1" },
        stateHistory: {
          equipmentId: "1",
          states: [{ date: "2024-01-01", equipmentStateId: "1" }],
        },
        positionHistory: {
          equipmentId: "1",
          positions: [{ date: "2024-01-01", lat: 0, lon: 0 }],
        },
      },
    ]);
  });

  it("should handle error correctly when fetching data", async () => {
    (EquipmentService.getEquipments as jest.Mock).mockRejectedValue(
      new Error("Network Error"),
    );

    const { result, waitForNextUpdate } = renderHook(() => useAllData());

    await waitForNextUpdate();

    // Checks if the error was treated
    expect(result.current.allData).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(
      "Failed to load equipment data. Error: Network Error",
    );
  });

  it("should fetch data correctly when equipment exists", async () => {
    const mockEquipments = [
      { id: "1", name: "Equipamento 1", equipmentModelId: "1" },
    ];
    const mockEquipmentModels = [{ id: "1", name: "Modelo 1" }];
    const mockEquipmentStates = [{ id: "1", name: "Operando", color: "Green" }];
    const mockEquipmentStateHistory = [
      {
        equipmentId: "1",
        states: [{ date: "2024-01-01", equipmentStateId: "1" }],
      },
    ];
    const mockEquipmentPositionHistory = [
      { equipmentId: "1", positions: [{ date: "2024-01-01", lat: 0, lon: 0 }] },
    ];

    (EquipmentService.getEquipments as jest.Mock).mockResolvedValue(
      mockEquipments,
    );
    (EquipmentService.getEquipmentModels as jest.Mock).mockResolvedValue(
      mockEquipmentModels,
    );
    (EquipmentService.getEquipmentStates as jest.Mock).mockResolvedValue(
      mockEquipmentStates,
    );
    (EquipmentService.getEquipmentStateHistory as jest.Mock).mockResolvedValue(
      mockEquipmentStateHistory,
    );
    (
      EquipmentService.getEquipmentPositionHistory as jest.Mock
    ).mockResolvedValue(mockEquipmentPositionHistory);

    const { result, waitForNextUpdate } = renderHook(() => useAllData("1"));
    await waitForNextUpdate();

    expect(result.current.allData).toEqual([
      {
        id: "1",
        name: "Equipamento 1",
        model: "Modelo 1",
        position: { lat: 0, lon: 0 },
        state: { id: "1", name: "Operando", color: "Green" },
        equipmentModel: { id: "1", name: "Modelo 1" },
        stateHistory: {
          equipmentId: "1",
          states: [{ date: "2024-01-01", equipmentStateId: "1" }],
        },
        positionHistory: {
          equipmentId: "1",
          positions: [{ date: "2024-01-01", lat: 0, lon: 0 }],
        },
      },
    ]);
  });

  it("should return error when equipment ID does not exist", async () => {
    const mockEquipment = [
      { id: "1", name: "Equipamento 1", equipmentModelId: "1" },
    ];
    (EquipmentService.getEquipments as jest.Mock).mockResolvedValue(
      mockEquipment,
    );
    (EquipmentService.getEquipmentModels as jest.Mock).mockResolvedValue([]);
    (EquipmentService.getEquipmentStates as jest.Mock).mockResolvedValue([]);
    (EquipmentService.getEquipmentStateHistory as jest.Mock).mockResolvedValue(
      [],
    );
    (
      EquipmentService.getEquipmentPositionHistory as jest.Mock
    ).mockResolvedValue([]);

    const { result, waitForNextUpdate } = renderHook(() => useAllData("999"));
    await waitForNextUpdate();

    expect(result.current.error).toBe(
      "Failed to load equipment data. Error: Equipment with ID 999 not found.",
    );
  });
});
