import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
// import { ref } from "vue";
import MapView from "../MapView.vue"
// import { useApiStore } from "@/stores/api";
import { usePositionHistoryStore } from "@/stores/positionHistory";
// import { useStateHistoryStore } from "@/stores/stateHistory";

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
    ]
  }),
}));

vi.mock("@/stores/positionHistory", () => ({
  usePositionHistoryStore: vi.fn(() => ({
    getLatestPositionsHistory: vi.fn(),
    latestEquipmentInfo: [],
    equipmentPositionHistoryInfo: vi.fn(),
  })),
}));

vi.mock("@/stores/stateHistory", () => ({
  useStateHistoryStore: vi.fn(() => ({
    setStateHistoryView: vi.fn(),
    showStateHistory: false,
    getStateHistory: vi.fn(),
  })),
}));

describe("MapView", () => {
//   it("renders the map when there are positions", async () => {
//     const wrapper = mount(MapView, {
//       props: {
//         search: [],
//         filter: [],
//       },
//     });

//     await wrapper.vm.$nextTick();

//     expect(wrapper.find("l-map").exists()).toBe(true);
//     expect(wrapper.find("l-marker").exists()).toBe(true);
//   });

  // it("renders the map when there are positions", async () => {
  //   const positionHistoryStore = usePositionHistoryStore();

  //   // Simule a resposta do store
  //   positionHistoryStore.latestEquipmentInfo = [
  //     {
  //       lat: -19.126536,
  //       lon: -45.947756,
  //       equipmentId: "123",
  //       equipmentName: "Equipamento 1",
  //       equipmentModelId: "a7c53eb1",
  //       equipmentModelName: "Modelo X",
  //       currentStateName: "Operando",
  //       date: "2021-02-01T03:00:00.000Z",
  //       currentStateId: "9764",
  //       color: "#2ecc71",
  //       value: 100
  //     },
  //   ];

  //   // Monte o componente
  //   const wrapper = mount(MapView, {
  //     props: {
  //       search: [],
  //       filter: [],
  //     },
  //   });

  //   // Simule a chamada da função que carrega as posições
  //   await positionHistoryStore.getLatestPositionsHistory();

  //   // Aguarde a atualização do DOM
  //   await wrapper.vm.$nextTick(); 

  //   // Verifique se o mapa é renderizado corretamente
  //   expect(wrapper.find("l-map").exists()).toBe(true);
  //   expect(wrapper.find("l-marker").exists()).toBe(true);
  // });

  it("displays 'Nenhum equipamento encontrado' when no positions are found", async () => {
    const wrapper = mount(MapView, {
      props: {
        search: ['drsf'],
        filter: ['eqwe'],
      },
    });

    const positionHistoryStore = usePositionHistoryStore();
    positionHistoryStore.latestEquipmentInfo = [
      {
        lat: -19.126536,
        lon: -45.947756,
        equipmentId: "123",
        equipmentName: "Equipamento 1",
        equipmentModelId: "a7c53eb1",
        equipmentModelName: "Modelo X",
        currentStateName: "Operando",
        date: "2021-02-01T03:00:00.000Z",
        currentStateId: "9764",
        color: "#2ecc71",
        value: 100
      },
    ];

    await wrapper.vm.$nextTick();
    expect(wrapper.find(".no-data").text()).toContain("Nenhum equipamento encontrado.");
  });

  // it("calls openStateHistory when marker is clicked", async () => {

  //   const positionHistoryStore = usePositionHistoryStore();
  //   positionHistoryStore.latestEquipmentInfo = [
  //     {
  //       lat: 51.505,
  //       lon: -0.09,
  //       equipmentId: "123",
  //       equipmentName: "Equipamento 1",
  //       equipmentModelId: "Model123",
  //       equipmentModelName: "Modelo X",
  //       currentStateName: "Operando",
  //       date: "2021-02-01T03:00:00.000Z",
  //       currentStateId: "",
  //       color: "#2ecc71",
  //       value: 0
  //     },
  //   ];

  //   const openStateHistory = vi.fn();

  //   const wrapper = mount(MapView, {
  //     props: {
  //       search: [],
  //       filter: [],
  //     },
  //     global: {
  //       mocks: {
  //         openStateHistory,
  //       },
  //     }
  //   });
  //   await wrapper.vm.$nextTick();

  //   const marker = wrapper.find('l-marker');

  //   // Ensure the marker exists
  //   expect(marker.exists()).toBe(true);

  //   // Trigger the click event on the marker
  //   await marker.trigger('click');

  //   // Verify that `openStateHistory` was called
  //   expect(openStateHistory).toHaveBeenCalled();

  //   // const stateHistoryStore = useStateHistoryStore();


  //   // // Simula o clique no marcador
  //   // await wrapper.find("l-marker").trigger("click");
  //   // expect(stateHistoryStore.getStateHistory).toHaveBeenCalledWith("123");
  // });

  // it("fetches data on mount", () => {
  //   const apiStore = useApiStore();
  //   const wrapper = mount(MapView, {
  //     props: {
  //       search: [],
  //       filter: [],
  //     },
  //   });

  //   expect(apiStore.fetchAllData).toHaveBeenCalled();
  // });
});
