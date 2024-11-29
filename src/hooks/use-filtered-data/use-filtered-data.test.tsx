import { renderHook } from "@testing-library/react-hooks";
import { beforeEach } from "node:test";
import { useEquipmentMapStore } from "@/stores/equipment-map.store";
import { useFilteredEquipmentData } from "./use-filtered-data.hook";

jest.mock("@/stores/equipment-map.store", () => ({
  useEquipmentMapStore: jest.fn(),
}));

const mockEquipment = [
  {
    id: "1",
    name: "Equipamento 1",
    position: { lat: 0, lon: 0 },
    state: {
      id: "1",
      name: "Operando",
      color: "Green",
    },
    equipmentModel: {
      id: "1",
      name: "Modelo 1",
      hourlyEarnings: [],
    },
    stateHistory: {
      equipmentId: "1",
      states: [],
    },
    positionHistory: {
      equipmentId: "1",
      positions: [],
    },
  },
  {
    id: "2",
    name: "Equipamento 2",
    position: { lat: 0, lon: 0 },
    state: {
      id: "2",
      name: "Parado",
      color: "Yellow",
    },
    equipmentModel: {
      id: "2",
      name: "Modelo 2",
      hourlyEarnings: [],
    },
    stateHistory: {
      equipmentId: "2",
      states: [],
    },
    positionHistory: {
      equipmentId: "1",
      positions: [],
    },
  },
  {
    id: "3",
    name: "Equipamento 3",
    position: { lat: 0, lon: 0 },
    state: {
      id: "1",
      name: "Operando",
      color: "Green",
    },
    equipmentModel: {
      id: "2",
      name: "Modelo 2",
      hourlyEarnings: [],
    },
    stateHistory: {
      equipmentId: "3",
      states: [],
    },
    positionHistory: {
      equipmentId: "1",
      positions: [],
    },
  },
  {
    id: "4",
    name: "Equipamento 4",
    position: { lat: 0, lon: 0 },
    state: {
      id: "3",
      name: "Manutenção",
      color: "Red",
    },
    equipmentModel: {
      id: "3",
      name: "Modelo 3",
      hourlyEarnings: [],
    },
    stateHistory: {
      equipmentId: "4",
      states: [],
    },
    positionHistory: {
      equipmentId: "1",
      positions: [],
    },
  },
];

describe("use filtered data", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("must return all data when there are no filters", async () => {
    const mockUseEquipmentMapStore =
      useEquipmentMapStore as unknown as jest.Mock;
    mockUseEquipmentMapStore.mockResolvedValue({
      selectedState: null,
      selectedModel: null,
      search: "",
    });

    const { result } = renderHook(() =>
      useFilteredEquipmentData(mockEquipment),
    );

    expect(result.current.filteredData).toEqual(mockEquipment);
    expect(result.current.searchResults).toEqual([]);
  });

  it("must return the data filtered by state", async () => {
    const mockUseEquipmentMapStore =
      useEquipmentMapStore as unknown as jest.Mock;
    mockUseEquipmentMapStore.mockReturnValue({
      selectedState: "Operando",
      selectedModel: null,
      search: "",
    });

    const { result } = renderHook(() =>
      useFilteredEquipmentData(mockEquipment),
    );

    expect(result.current.filteredData).toEqual([
      {
        id: "1",
        name: "Equipamento 1",
        position: { lat: 0, lon: 0 },
        state: {
          id: "1",
          name: "Operando",
          color: "Green",
        },
        equipmentModel: {
          id: "1",
          name: "Modelo 1",
          hourlyEarnings: [],
        },
        stateHistory: {
          equipmentId: "1",
          states: [],
        },
        positionHistory: {
          equipmentId: "1",
          positions: [],
        },
      },
      {
        id: "3",
        name: "Equipamento 3",
        position: { lat: 0, lon: 0 },
        state: {
          id: "1",
          name: "Operando",
          color: "Green",
        },
        equipmentModel: {
          id: "2",
          name: "Modelo 2",
          hourlyEarnings: [],
        },
        stateHistory: {
          equipmentId: "3",
          states: [],
        },
        positionHistory: {
          equipmentId: "1",
          positions: [],
        },
      },
    ]);
    expect(result.current.searchResults).toEqual([]);
  });

  it("must return the data filtered by name", () => {
    const mockUseEquipmentMapStore =
      useEquipmentMapStore as unknown as jest.Mock;
    mockUseEquipmentMapStore.mockReturnValue({
      selectedState: null,
      selectedModel: null,
      search: "Equipamento 1",
    });

    const { result } = renderHook(() =>
      useFilteredEquipmentData(mockEquipment),
    );

    expect(result.current.filteredData).toEqual(mockEquipment);
    expect(result.current.searchResults).toEqual([
      {
        id: "1",
        name: "Equipamento 1",
        position: { lat: 0, lon: 0 },
        state: {
          id: "1",
          name: "Operando",
          color: "Green",
        },
        equipmentModel: {
          id: "1",
          name: "Modelo 1",
          hourlyEarnings: [],
        },
        stateHistory: {
          equipmentId: "1",
          states: [],
        },
        positionHistory: {
          equipmentId: "1",
          positions: [],
        },
      },
    ]);
  });

  it("must return the data searched by somethind", () => {
    const mockUseEquipmentMapStore =
      useEquipmentMapStore as unknown as jest.Mock;
    mockUseEquipmentMapStore.mockReturnValue({
      selectedState: null,
      selectedModel: null,
      search: "Equi",
    });

    const { result } = renderHook(() =>
      useFilteredEquipmentData(mockEquipment),
    );

    expect(result.current.filteredData).toEqual(mockEquipment);
    expect(result.current.searchResults).toEqual(mockEquipment);
  });
});
