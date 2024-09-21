import { setActivePinia, createPinia } from "pinia";
import { useStateHistoryStore } from "@/stores/stateHistory";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useApiStore } from "@/stores/api";

describe("StateHistory Store", () => {
    let stateHistoryStore: ReturnType<typeof useStateHistoryStore>;
    let apiStore: ReturnType<typeof useApiStore>;

    beforeEach(() => {
        setActivePinia(createPinia());
        stateHistoryStore = useStateHistoryStore();
        apiStore = useApiStore();

        vi.spyOn(apiStore, "equipments", "get").mockReturnValue([
            { id: "1", name: "Equipamento A", equipmentModelId: "789" },
            { id: "2", name: "Equipamento B", equipmentModelId: "654" },
        ]);

        vi.spyOn(apiStore, "equipmentsModel", "get").mockReturnValue([
            { id: "789", name: "Modelo A", hourlyEarnings:
                [
                    { equipmentStateId: "x74y", value: 100 },
                    { equipmentStateId: "u89o", value: 80 },
                ]
            },
            { id: "654", name: "Modelo B", hourlyEarnings:
                [
                    { equipmentStateId: "x74y", value: 50 },
                    { equipmentStateId: "u89o", value: 20 },
                ]
            },
        ]);

        vi.spyOn(apiStore, "equipmentState", "get").mockReturnValue([
            { id: "x74y", name: "Manutenção", color: "red" },
            { id: "u89o", name: "Operando", color: "green" },
        ]);

        vi.spyOn(apiStore, "equipmentStateHistory", "get").mockReturnValue([
            {
                equipmentId: "1",
                states: [
                    { date: "2021-01-01T00:00:00Z", equipmentStateId: "x74y" },
                    { date: "2021-01-01T18:00:00Z", equipmentStateId: "u89o" },
                ]
            },
            {
                equipmentId: "2",
                states: [
                    { date: "2021-01-01T5:00:00Z", equipmentStateId: "u89o" },
                    { date: "2021-01-01T15:00:00Z", equipmentStateId: "x74y" },
                ]
            }
        ]);
    });

    it("should set showStateHistory correctly", () => {
        stateHistoryStore.setStateHistoryView(true);
        expect(stateHistoryStore.showStateHistory).toBe(true);

        stateHistoryStore.setStateHistoryView(false);
        expect(stateHistoryStore.showStateHistory).toBe(false);
    });

    it("should reset stateHistoryData correctly", () => {
        stateHistoryStore.stateHistoryData = {
            equipmentId: "1234",
            equipmentName: "Equipamento X",
            equipmentModelId: "6547",
            equipmentModelName: "MX",
            productivity: 15.45,
            lastState: "Operando",
            states: []
        };
        stateHistoryStore.resetStateHistoryData();
        expect(stateHistoryStore.stateHistoryData).toEqual({});
    });

    it("should map equipment data correctly", () => {   
        const result = stateHistoryStore.mapEquipmentData();
        expect(result).toEqual([
            { equipmentId: "1", equipmentName: "Equipamento A", equipmentModelId: "789", equipmentModelName: "Modelo A" },
            { equipmentId: "2", equipmentName: "Equipamento B", equipmentModelId: "654", equipmentModelName: "Modelo B" },
        ]);
    });

    it("should add state names correctly", () => {   
        const oldStates = [
            { date: "2021-01-01T00:00:00Z", equipmentStateId: "x74y" },
            { date: "2021-01-02T00:00:00Z", equipmentStateId: "u89o" },
        ];
    
        const result = stateHistoryStore.addStateNames(oldStates);
        expect(result).toEqual([
            { date: "2021-01-01T00:00:00Z", equipmentStateId: "x74y", equipmentStateName: "Manutenção" },
            { date: "2021-01-02T00:00:00Z", equipmentStateId: "u89o", equipmentStateName: "Operando" },
        ]);
    });

    it("should calculate productivity correctly", () => {
        const states = [
            { date: "2021-01-02T00:00:00Z", equipmentStateId: "x74y", equipmentStateName: "Manutenção" },
            { date: "2021-01-02T18:00:00Z", equipmentStateId: "u89o", equipmentStateName: "Operando" },
        ];
    
        const result = stateHistoryStore.calculateProductivity(states);
        expect(result).toEqual({ productivity: 75, lastState: "Operando" });
    });

    it("should get state history correctly", () => {    
        stateHistoryStore.getStateHistory("1");
    
        expect(stateHistoryStore.stateHistoryData).toEqual({
            equipmentId: "1",
            equipmentName: "Equipamento A",
            equipmentModelId: "789",
            equipmentModelName: "Modelo A",
            states: [
                { date: "2021-01-01T18:00:00Z", equipmentStateId: "u89o", equipmentStateName: "Operando" },
                { date: "2021-01-01T00:00:00Z", equipmentStateId: "x74y", equipmentStateName: "Manutenção" },
            ],
            productivity: 75,
            lastState: "Operando"
        });
    });
});
