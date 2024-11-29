import { describe, expect, it } from "vitest";
import {
  calculateDistance,
  findNearestMaintenance,
} from "../calculate-maintenances.util";

describe("maintenances", () => {
  const maintenances = [
    {
      id: "0123",
      name: "0123",
      position: { lat: -19.126536, lon: -45.947756 },
    },
    { id: "0124", name: "0124", position: { lat: -19.061067, lon: -45.97841 } },
    {
      id: "0125",
      name: "0125",
      position: { lat: -19.170004, lon: -46.035787 },
    },
    {
      id: "0126",
      name: "0126",
      position: { lat: -18.983775, lon: -45.816933 },
    },
  ];

  it("should calculate the correct distance between two points", () => {
    const point1 = { lat: -19.126536, lon: -45.947756 };
    const distance = calculateDistance(
      point1.lat,
      point1.lon,
      maintenances[1].position.lat,
      maintenances[1].position.lon,
    );

    expect(distance).toBeCloseTo(7.96, 2); //~=7.96km
  });

  it("should return zero when calculating the distance between the same point", () => {
    const point = { lat: -19.126536, lon: -45.947756 };
    const distance = calculateDistance(
      point.lat,
      point.lon,
      point.lat,
      point.lon,
    );

    expect(distance).toBe(0);
  });

  it("should find the closest maintenance station", () => {
    const equipment = { lat: -19.1, lon: -45.95 };

    const closest = findNearestMaintenance(equipment, maintenances);
    expect(closest?.name).toBe("0123");
  });

  it("should return null when no maintenances are available", () => {
    const equipment = { lat: -19.1, lon: -45.95 };
    const closest = findNearestMaintenance(equipment, []);

    expect(closest).toBeNull();
  });

  it("should return the only maintenance station available", () => {
    const equipment = { lat: -19.1, lon: -45.95 };
    const singleMaintenance = [
      {
        id: "0123",
        name: "0123",
        position: { lat: -19.126536, lon: -45.947756 },
      },
    ];

    const closest = findNearestMaintenance(equipment, singleMaintenance);
    expect(closest?.name).toBe("0123");
  });

  it("should handle equidistant maintenance stations", () => {
    const equipment = { lat: -19.1, lon: -45.95 };
    const equidistantMaintenances = [
      {
        id: "0123",
        name: "0123",
        position: { lat: -19.126536, lon: -45.947756 },
      },
      {
        id: "0124",
        name: "0124",
        position: { lat: -19.126536, lon: -45.947756 },
      },
    ];

    const closest = findNearestMaintenance(equipment, equidistantMaintenances);
    expect(closest?.name).toBe("0123"); // Ou outra regra que defina como desempatar
  });

  it("should handle invalid latitude or longitude values", () => {
    const equipment = { lat: 91, lon: 181 }; // Valores inválidos
    const closest = findNearestMaintenance(equipment, maintenances);

    expect(closest).toBeNull(); // Ou outro comportamento esperado para entradas inválidas
  });

  it("should calculate very small distances accurately", () => {
    const point1 = { lat: -19.126536, lon: -45.947756 };
    const point2 = { lat: -19.126537, lon: -45.947757 };

    const distance = calculateDistance(
      point1.lat,
      point1.lon,
      point2.lat,
      point2.lon,
    );
    expect(distance).toBeCloseTo(0.00015297, 5); // Distância em km
  });

  it("should handle points in opposite hemispheres", () => {
    const point1 = { lat: 19.126536, lon: 45.947756 };
    const point2 = { lat: -19.126536, lon: -45.947756 };

    const distance = calculateDistance(
      point1.lat,
      point1.lon,
      point2.lat,
      point2.lon,
    );
    expect(distance).toBeGreaterThan(0); // Valor exato dependerá das coordenadas
  });
});
