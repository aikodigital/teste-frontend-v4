import { setActivePinia, createPinia } from "pinia";
import { useApiStore } from "@/stores/api";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("API Store", () => {
    let apiStore: ReturnType<typeof useApiStore>;

    beforeEach(() => {
        setActivePinia(createPinia());
        apiStore = useApiStore();
    });

    it("should fetch and set equipment data correctly", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: () => Promise.resolve([{ id: "1", name: "Equipamento Teste" }]),
        });

        await apiStore.fetchEquipments();
        expect(apiStore.equipments).toEqual([{ id: "1", name: "Equipamento Teste" }]);
    });

    it("should handle fetch error for equipments", async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error("Network Error"));

        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        await apiStore.fetchEquipments();

        expect(consoleErrorSpy).toHaveBeenCalledWith("Erro ao carregar os equipamentos:", expect.any(Error));
        consoleErrorSpy.mockRestore();
    });

    it("should fetch all data correctly", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: () => Promise.resolve([]),
        });

        await apiStore.fetchAllData();

        expect(apiStore.equipments).toEqual([]);
        expect(apiStore.equipmentsModel).toEqual([]);
        expect(apiStore.equipmentPositionHistory).toEqual([]);
        expect(apiStore.equipmentStateHistory).toEqual([]);
        expect(apiStore.equipmentState).toEqual([]);
    });
});
