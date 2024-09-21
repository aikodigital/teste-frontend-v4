import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import App from "@/App.vue";
import HeaderApp from "@/components/HeaderApp.vue";
import ChecklistInput from "@/components/ChecklistInput.vue";
import MapView from "@/components/MapView.vue";
import StateHistory from "@/components/StateHistory.vue";
import { useStateHistoryStore } from "@/stores/stateHistory";
import { createPinia, type Pinia } from "pinia";

interface AppComponentInstance {
    filterInput: string[];
    searchInput: string[];
}

vi.mock("@/stores/api", () => ({
    useApiStore: () => ({
        fetchEquipments: vi.fn(),
        fetchEquipmentsModel: vi.fn(),
        fetchPositionHistory: vi.fn(),
        fetchStateHistory: vi.fn(),
        fetchState: vi.fn(),
        fetchAllData: vi.fn(),
        equipmentState: [
            { id: "S1", name: "Manutenção", color: "yellow" },
            { id: "S2", name: "Operando", color: "green" },
        ],
        equipmentsModel: [
            { id: "A1", name: "Caminhão", hourlyEarnings:
                [
                    { "equipmentStateId": "S1","value": 100 },
                    { "equipmentStateId": "S2","value": -5 },
                    { "equipmentStateId": "S3","value": -20 }
                ]
            },
            { id: "A2", name: "Garra", hourlyEarnings:
                [
                    { "equipmentStateId": "S1", "value": 80 },
                    { "equipmentStateId": "S2", "value": -10 },
                    { "equipmentStateId": "S3", "value": -5 }
                ]
            },
        ],
        equipmentPositionHistory: [
            {
                equipmentId: "1",
                positions: [
                    { "date": "2021-02-01T03:00:00.000Z", "lat": -19.126536, "lon": -45.947756 },
                    { "date": "2021-02-01T15:00:00.000Z", "lat": -19.264235, "lon": -46.092436 },
                    { "date": "2021-02-01T18:00:00.000Z", "lat": -18.589235, "lon": -47.156436 },
                ],
            },
            {
                equipmentId: "2",
                positions: [
                    { "date": "2021-02-03T05:00:00.000Z", "lat": -20.126536, "lon": -40.947756 },
                    { "date": "2021-02-04T10:00:00.000Z", "lat": -21.264235, "lon": -41.092436 },
                    { "date": "2021-02-05T20:00:00.000Z", "lat": -22.589235, "lon": -42.156436 },
                ],
            },
        ],
        equipments: [
            { id: "1", name: "Equipamento A", equipmentModelId: "A1" },
            { id: "2", name: "Equipamento B", equipmentModelId: "A2" },
        ],
        equipmentStateHistory: [
            { equipmentId: "1", states:
                [
                    { date: "2024-09-21T16:00:00Z", equipmentStateId: "S1" },
                    { date: "2024-09-21T20:00:00Z", equipmentStateId: "S2" },
                ]
            },
            { equipmentId: "2", states:
                [
                    { date: "2024-09-25T13:00:00Z", equipmentStateId: "S2" },
                    { date: "2024-09-25T15:00:00Z", equipmentStateId: "S1" },
                ]
            },
        ]
    }),
}));

vi.mock("leaflet", () => ({
    L: {
        map: vi.fn().mockReturnValue({
            setView: vi.fn(),
            addLayer: vi.fn(),
            removeLayer: vi.fn(),
        }),
        tileLayer: vi.fn().mockReturnValue({
            addTo: vi.fn(),
        }),
        marker: vi.fn().mockReturnValue({
            addTo: vi.fn(),
            bindPopup: vi.fn(),
            on: vi.fn(),
        }),
    },
}));

vi.mock("@vue-leaflet/vue-leaflet", () => ({
    LMap: {
        name: "LMap",
        props: {
            zoom: Number,
            center: Array,
            "use-global-leaflet": Boolean,
        },
        render: () => ({ template: "<div></div>" }),
    },
    LTileLayer: {
        name: "LTileLayer",
        render: () => ({ template: "<div></div>" }),
    },
    LMarker: {
        name: "LMarker",
        props: {
            latLng: Array,
        },
        render: () => ({ template: "<div></div>" }),
    },
    LPopup: {
        name: "LPopup",
        render: () => ({ template: "<div></div>" }),
    },
}));

describe("App.vue", () => {
    let stateHistoryStore: ReturnType<typeof useStateHistoryStore>;
    let pinia: Pinia;

    beforeEach(() => {
        pinia = createPinia();
        stateHistoryStore = useStateHistoryStore(pinia);
        stateHistoryStore.showStateHistory = false;
    });

    it("renders HeaderApp, ChecklistInput, MapView, and StateHistory", () => {
        const wrapper = mount(App, {
            global: {
                plugins: [pinia],
            },
        });

        expect(wrapper.findComponent(HeaderApp).exists()).toBe(true);
        expect(wrapper.findComponent(ChecklistInput).exists()).toBe(true);
        expect(wrapper.findComponent(MapView).exists()).toBe(true);
        expect(wrapper.findComponent(StateHistory).exists()).toBe(stateHistoryStore.showStateHistory);
    });

    it("updates search input on header update", () => {
        const wrapper = mount(App, {
            global: {
                plugins: [pinia],
            },
        });
        const header = wrapper.findComponent(HeaderApp);

        header.vm.$emit("updateSearch", ["search term"]);
        const appInstance = wrapper.vm as unknown as AppComponentInstance;

        expect(appInstance.searchInput).toEqual(["search term"]);
    });

    it("updates filter input on checklist input update", () => {
        const wrapper = mount(App, {
            global: {
                plugins: [pinia],
            },
        });
        const checklistInput = wrapper.findComponent(ChecklistInput);
        checklistInput.vm.$emit("updateFilter", ["filter term"]);

        const appInstance = wrapper.vm as unknown as AppComponentInstance;
        expect(appInstance.filterInput).toEqual(["filter term"]);
    });
});
