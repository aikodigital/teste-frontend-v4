import { setActivePinia, createPinia } from "pinia";
import { usePositionHistoryStore } from "@/stores/positionHistory";
import { useApiStore } from "@/stores/api";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("PositionHistory Store", () => {
    let positionHistoryStore: ReturnType<typeof usePositionHistoryStore>;
    let apiStore: ReturnType<typeof useApiStore>;

    beforeEach(() => {
        setActivePinia(createPinia());
        positionHistoryStore = usePositionHistoryStore();
        apiStore = useApiStore();

        vi.spyOn(apiStore, "equipmentPositionHistory", "get").mockReturnValue([
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
        ]);

        vi.spyOn(apiStore, "equipments", "get").mockReturnValue([
            { id: "1", name: "Equipamento A", equipmentModelId: "A1" },
            { id: "2", name: "Equipamento B", equipmentModelId: "A2" },
        ]);

        vi.spyOn(apiStore, "equipmentStateHistory", "get").mockReturnValue([
            {
                equipmentId: "1", states:
                    [
                        { date: "2024-09-21T16:00:00Z", equipmentStateId: "S1" },
                        { date: "2024-09-21T20:00:00Z", equipmentStateId: "S2" },
                    ]
            },
            {
                equipmentId: "2", states:
                    [
                        { date: "2024-09-25T13:00:00Z", equipmentStateId: "S2" },
                        { date: "2024-09-25T15:00:00Z", equipmentStateId: "S1" },
                    ]
            },
        ]);

        vi.spyOn(apiStore, "equipmentState", "get").mockReturnValue([
            { id: "S1", name: "Manutenção", color: "yellow" },
            { id: "S2", name: "Operando", color: "green" },
        ]);

        vi.spyOn(apiStore, "equipmentsModel", "get").mockReturnValue([
            {
                id: "A1", name: "Caminhão", hourlyEarnings:
                    [
                        { "equipmentStateId": "S1", "value": 100 },
                        { "equipmentStateId": "S2", "value": -5 },
                        { "equipmentStateId": "S3", "value": -20 }
                    ]
            },
            {
                id: "A2", name: "Garra", hourlyEarnings:
                    [
                        { "equipmentStateId": "S1", "value": 80 },
                        { "equipmentStateId": "S2", "value": -10 },
                        { "equipmentStateId": "S3", "value": -5 }
                    ]
            },
        ]);
    });

    it("should get the latest position of an equipment", () => {
        const equipment = apiStore.equipmentPositionHistory.find(e => e.equipmentId === "1");
        const latestPosition = positionHistoryStore.getLatestPosition(equipment!);

        expect(latestPosition).toEqual({
            date: "2021-02-01T18:00:00.000Z",
            lat: -18.589235,
            lon: -47.156436
        });
    });

    it("should correctly get state values based on the latest state", () => {
        positionHistoryStore.getLatestPositionsHistory();

        const equipmentInfo = positionHistoryStore.latestEquipmentInfo[0];

        expect(equipmentInfo.currentStateName).toBe("Operando");
        expect(equipmentInfo.value).toBe(-5);
    });

    it("should populate latestEquipmentInfo correctly after calling getLatestPositionsHistory()", () => {
        positionHistoryStore.getLatestPositionsHistory();

        expect(positionHistoryStore.latestEquipmentInfo).toEqual([
            {
                date: "2021-02-01T18:00:00.000Z",
                lat: -18.589235,
                lon: -47.156436,
                equipmentId: "1",
                equipmentName: "Equipamento A",
                currentStateId: "S2",
                currentStateName: "Operando",
                color: "green",
                equipmentModelId: "A1",
                equipmentModelName: "Caminhão",
                value: -5,
            },
            {
                date: "2021-02-05T20:00:00.000Z",
                lat: -22.589235,
                lon: -42.156436,
                equipmentId: "2",
                equipmentName: "Equipamento B",
                currentStateId: "S1",
                currentStateName: "Manutenção",
                color: "yellow",
                equipmentModelId: "A2",
                equipmentModelName: "Garra",
                value: 80,
            }
        ]);
    });

    it("mergePositionsWithStates should merge positions with the correct states", () => {
        const positions = [
            { date: "2021-02-01T18:00:00.000Z", lat: -18.589235, lon: -47.156436 },
            { date: "2021-02-01T15:00:00.000Z", lat: -19.264235, lon: -46.092436 },
            { date: "2021-02-02T10:00:00.000Z", lat: -15.242235, lon: -50.045436 },
        ];
        const states = [
            { date: "2021-02-01T20:00:00.000Z", equipmentStateId: "S2" },
            { date: "2021-02-01T18:00:00.000Z", equipmentStateId: "S1" },
            { date: "2021-02-01T15:00:00.000Z", equipmentStateId: "S2" },
            { date: "2021-02-01T14:00:00.000Z", equipmentStateId: "S1" },
            { date: "2021-02-02T10:00:00.000Z", equipmentStateId: "S2" },
        ];

        const result = positionHistoryStore.mergePositionsWithStates(positions, states);

        expect(result).toEqual([
            {
                date: "2021-02-01T18:00:00.000Z", lat: -18.589235, lon: -47.156436,
                equipmentStateId: "S1", color: "yellow", currentStateName: "Manutenção"
            },
            {
                date: "2021-02-01T15:00:00.000Z", lat: -19.264235, lon: -46.092436,
                equipmentStateId: "S2", color: "green", currentStateName: "Operando"
            },
            {
                date: "2021-02-02T10:00:00.000Z", lat: -15.242235, lon: -50.045436,
                equipmentStateId: "S2", color: "green", currentStateName: "Operando"
            }
        ]);
    });
});
