import { renderHook } from "@testing-library/react";
import { useEnrichedEquipmentData } from "../hooks/useEnrichedEquipmentData";

jest.mock("../hooks/useEquipmentData", () => ({
    useEquipmentData: () => ({
        equipments: [{ id: "1", name: "Trator", equipmentModelId: "modelo-1" }]
    }),
}));

jest.mock("../hooks/useEquipmentState", () => ({
    useEquipmentState: () => ({
        states: [{ id: "estado-1", name: "Operando", color: "green" }]
    }),
}));

jest.mock("../hooks/useEquipmentModel", () => ({
    useEquipmentModel: () => ({
        models: [{ id: "modelo-1", name: "Modelo A", hourlyRate: 50 }]
    }),
}));

jest.mock("../hooks/useEquipmentStateHistory", () => ({
    useEquipmentStateHistory: () => ({
        stateHistory: [
        {
            equipmentId: "1",
            states: [
            { date: "2021-01-01T10:00:00", equipmentStateId: "estado-1" },
            ]
        }
        ]
    }),
}));

jest.mock("../hooks/useEquipmentPositionHistory", () => ({
    useEquipmentPositionHistory: () => ({
        positions: [
        {
            equipmentId: "1",
            positions: [{ lat: -10, lon: -50 }]
        }
        ]
    }),
}));

describe("useEnrichedEquipmentData", () => {
    it("deve retornar dados enriquecidos", () => {
        const { result } = renderHook(() => useEnrichedEquipmentData());
        expect(result.current.data[0]).toHaveProperty("model", "Modelo A");
        expect(result.current.data[0]).toHaveProperty("state.name", "Operando");
        expect(result.current.data[0]).toHaveProperty("position.lat", -10);
    });
});
