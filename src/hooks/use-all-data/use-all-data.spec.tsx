import { fetchData } from "@/utils/fetch-data";
import { beforeEach, describe } from "node:test";
import { expect, it, Mock, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { useAllData } from "./use-all-data.hook";

const mockEquipments = [
  {
    id: "0001",
    equipmentModelId: "00001",
    name: "CA-0001",
  },
  {
    id: "0002",
    equipmentModelId: "00002",
    name: "CA-0002",
  },
];

const mockEquipmentModels = [
  {
    id: "00001",
    name: "Caminhão de carga",
  },
  {
    id: "00002",
    name: "Harvester",
  },
];

const mockEquipmentStates = [
  { id: "s1", name: "Estado 1", color: "red" },
  { id: "s2", name: "Estado 2", color: "green" },
];

const mockEquipmentPositionHistory = [
  { equipmentId: "1", positions: [{ date: "2024-11-01", lat: 10, lon: 20 }] },
  { equipmentId: "2", positions: [{ date: "2024-11-02", lat: 15, lon: 25 }] },
];

const mockEquipmentStateHistory = [
  {
    equipmentId: "1",
    states: [{ date: "2024-11-01", equipmentStateId: "s1" }],
  },
  {
    equipmentId: "2",
    states: [{ date: "2024-11-02", equipmentStateId: "s2" }],
  },
];

vi.mock("@/utils/fetch-data", () => ({
  fetchData: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();
});

function TestComponent() {
  const { allData, loading, error } = useAllData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {allData.map((item) => (
        <li key={item.id}>
          {item.name} - {item.model} - {item.state.name} - ({item.position.lat},{" "}
          {item.position.lon})
        </li>
      ))}
    </ul>
  );
}

describe("use all data", () => {
  it("should return the correct equipments", async () => {
    (fetchData as Mock)
      .mockResolvedValueOnce(mockEquipments)
      .mockResolvedValueOnce(mockEquipmentModels)
      .mockResolvedValueOnce(mockEquipmentStates)
      .mockResolvedValueOnce(mockEquipmentStateHistory)
      .mockResolvedValueOnce(mockEquipmentPositionHistory);

    const { getByText, queryByText } = render(<TestComponent />);

    expect(getByText("Loading...")).toBeTruthy();

    await waitFor(() => {
      expect(queryByText("Loading...")).toBeNull(); // Não deve mais estar carregando
      expect(
        getByText("CA-0001 - Caminhão de carga - Estado 1 - (10, 20)"),
      ).toBeTruthy();
      expect(
        getByText("CA-0002 - Harvester - Estado 2 - (15, 25)"),
      ).toBeTruthy();
    });
  });
});
