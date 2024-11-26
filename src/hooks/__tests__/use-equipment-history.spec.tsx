import { renderHook } from "@testing-library/react-hooks";
import { afterEach, describe, expect, it, Mock, vi } from "vitest";
import { fetchData } from "@/utils/fetch-data";
import { useEquipmentHistory } from "../use-equipment-history.hook";

vi.mock("@/utils/fetch-data", () => ({
  fetchData: vi.fn(),
}));

describe("use equipment history", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and return equipment history successfully", async () => {
    const mockEquipment = [
      { id: "1", name: "Equipamento 1", equipmentModelId: "1" },
    ];
    const mockModels = [{ id: "1", name: "Model A" }];
    const mockStates = [
      { id: "1", name: "Operando", color: "Green" },
      { id: "2", name: "Parado", color: "Red" },
    ];
    const mockStateHistory = [
      {
        equipmentId: "1",
        states: [
          { equipmentStateId: "1", date: "2023-11-25T12:00:00Z" },
          { equipmentStateId: "2", date: "2023-11-26T12:00:00Z" },
        ],
      },
    ];

    (fetchData as Mock)
      .mockResolvedValueOnce(mockEquipment)
      .mockResolvedValueOnce(mockModels)
      .mockResolvedValueOnce(mockStates)
      .mockResolvedValueOnce(mockStateHistory)
      .mockResolvedValueOnce([]);

    const { result, waitForNextUpdate } = renderHook(() =>
      useEquipmentHistory("1"),
    );
    await waitForNextUpdate();

    expect(result.current.data).toEqual({
      id: "1",
      name: "Equipamento 1",
      model: "Model A",
      history: [
        {
          date: "2023-11-25T12:00:00Z",
          type: "state",
          state: { id: "1", name: "Operando", color: "Green" },
        },
        {
          date: "2023-11-26T12:00:00Z",
          type: "state",
          state: { id: "2", name: "Parado", color: "Red" },
        },
      ],
    });
  });

  it("should return error when equipment with ID is not found", async () => {
    const mockEquipment = [
      { id: "1", name: "Equipamento 1", equipmentModelId: "1" },
    ];

    (fetchData as Mock)
      .mockResolvedValueOnce(mockEquipment)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const { result, waitForNextUpdate } = renderHook(() =>
      useEquipmentHistory("999"),
    );
    await waitForNextUpdate();

    expect(result.current.error).toBe('Equipment with ID "999" not found');
  });

  it("should return error when fetch data fails", async () => {
    (fetchData as Mock).mockRejectedValueOnce(new Error("Error loading data"));

    const { result, waitForNextUpdate } = renderHook(() =>
      useEquipmentHistory("1"),
    );

    await waitForNextUpdate();

    expect(result.current.error).toBe("Error loading data");
  });
});
