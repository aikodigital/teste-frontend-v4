import { beforeEach, describe, it, vi, Mock, expect } from "vitest";
import {
  fetchEquipment,
  fetchEquipmentById,
  fetchEquipmentModel,
  fetchEquipmentModelById,
} from "./use-equipment.hook";

global.fetch = vi.fn();

const mockEquipmentData = [
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

const mockEquipmentModelData = [
  {
    id: "00001",
    name: "Caminhão de carga",
  },
  {
    id: "00002",
    name: "Harvester",
  },
];

beforeEach(() => {
  vi.resetAllMocks();
});

describe("equipment", () => {
  it("should return equipments", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockEquipmentData),
    });

    const result = await fetchEquipment();

    expect(result).toEqual(mockEquipmentData);
    expect(fetch).toHaveBeenCalledWith("/data/equipment.json");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if fetch fails", async () => {
    (fetch as Mock).mockRejectedValueOnce(new Error("Network Error"));

    await expect(fetchEquipment()).rejects.toThrow("Network Error");

    expect(fetch).toHaveBeenCalledWith("/data/equipment.json");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should return the correct equipment", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockEquipmentData),
    });

    const equipment = await fetchEquipmentById("0002");

    const expectedEquipment = {
      id: "0002",
      equipmentModelId: "00002",
      name: "CA-0002",
    };

    expect(equipment).toEqual(expectedEquipment);
    expect(fetch).toHaveBeenCalledWith("/data/equipment.json");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should return undefined if no equipment matches the given id", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockEquipmentData),
    });

    const equipment = await fetchEquipmentById("0000");

    expect(equipment).toBeUndefined();
    expect(fetch).toHaveBeenCalledWith("/data/equipment.json");
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe("equipment model", () => {
  it("should return all models", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockEquipmentModelData),
    });

    const models = await fetchEquipmentModel();

    expect(models).toEqual(mockEquipmentModelData);
    expect(fetch).toHaveBeenCalledWith("/data/equipment-model.json");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if fetch fails", async () => {
    (fetch as Mock).mockRejectedValueOnce(new Error("Network Error"));

    await expect(fetchEquipmentModel()).rejects.toThrow("Network Error");

    expect(fetch).toHaveBeenCalledWith("/data/equipment-model.json");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should return the correct equipment", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockEquipmentModelData),
    });

    const equipment = await fetchEquipmentModelById("00001");
    const expectedEquipment = {
      id: "00001",
      name: "Caminhão de carga",
    };

    expect(equipment).toEqual(expectedEquipment);
    expect(fetch).toHaveBeenCalledWith("/data/equipment-model.json");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should return undefined if no equipment model matches the given id", async () => {
    (fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockEquipmentData),
    });

    const equipment = await fetchEquipmentModelById("00000");

    expect(equipment).toBeUndefined();
    expect(fetch).toHaveBeenCalledWith("/data/equipment-model.json");
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
