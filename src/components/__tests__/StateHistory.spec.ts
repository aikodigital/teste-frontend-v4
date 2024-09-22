import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import StateHistory from "@/components/StateHistory.vue";

interface StateHistoryStore {
    stateHistoryData: {
        equipmentName: string;
        equipmentModelName: string;
        lastState: string;
        productivity: number;
        states: { date: string; equipmentStateName: string; }[];
    };
    setStateHistoryView: (status: boolean) => void;
    resetStateHistoryData: () => void;
}

let stateHistoryStore: StateHistoryStore;

vi.mock("@/stores/stateHistory", () => ({
    useStateHistoryStore: () => stateHistoryStore
}));

vi.mock("@/stores/positionHistory", () => ({
    usePositionHistoryStore: vi.fn(() => ({
      getLatestPositionsHistory: vi.fn(),
      latestEquipmentInfo: [],
      resetPositionHistoryData: vi.fn(),
    })),
  }));

describe("StateHistory.vue", () => {
    beforeEach(() => {
        stateHistoryStore = {
            stateHistoryData: {
                equipmentName: "Equipamento A",
                equipmentModelName: "Modelo A",
                lastState: "Operando",
                productivity: 85,
                states: [
                    { date: "2024-09-01T03:00:00.000Z", equipmentStateName: "Operando" },
                    { date: "2024-09-02T04:00:00.000Z", equipmentStateName: "Parado" }
                ]
            },
            setStateHistoryView: vi.fn(),
            resetStateHistoryData: vi.fn(),
        };
    });

    it("renders equipment name and model name", () => {
        const wrapper = mount(StateHistory);
        
        expect(wrapper.find("h2").text()).toBe("Equipamento A");
        expect(wrapper.find("h3").text()).toBe("Modelo A");
    });

    it("shows productivity if last state is 'Operando'", () => {
        const wrapper = mount(StateHistory);
        
        expect(wrapper.findAll("h3")[1].text()).toContain("Produtividade de 85.00%");
    });

    it("renders state history table", () => {
        const wrapper = mount(StateHistory);

        const rows = wrapper.findAll("tbody tr");
        expect(rows).toHaveLength(2);
        expect(rows[0].find("td").text()).toBe("02/09/2024 às 04:00");
        expect(rows[1].find("td").text()).toBe("01/09/2024 às 03:00");
        expect(rows[0].find("td:nth-child(2)").text()).toBe("Parado");
    });

    it("calls close method and resets data", async () => {
        const wrapper = mount(StateHistory);
        await wrapper.find(".close-btn").trigger("click");

        expect(stateHistoryStore.setStateHistoryView).toHaveBeenCalledWith(false);
        expect(stateHistoryStore.resetStateHistoryData).toHaveBeenCalled();
    });
});
