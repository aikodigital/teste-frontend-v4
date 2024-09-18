import { createStore } from "vuex";

let stateMap: Record<string, { name: string; color: string }> = {};

interface Marker {
  position: [number, number];
  content: string;
  equipmentId: string;
}

interface EquipmentStateHistory {
  date: string;
  name: string;
  color: string;
}

interface EquipmentDetails {
  name: string;
  modelName: string;
}

interface Equipment {
  id: string;
  equipmentModelId: string;
  name: string;
}

interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: Array<{
    equipmentStateId: string;
    value: number;
  }>;
}

export default createStore({
  state: {
    markers: [] as Marker[],
    equipmentStateHistory: {} as Record<string, EquipmentStateHistory[]>,
    stateDefinitions: {} as Record<string, { name: string; color: string }>,
    equipmentDetails: {} as Record<string, EquipmentDetails>,
    latestStates: {} as Record<string, string>,
  },
  mutations: {
    setMarkers(state, markers: Marker[]) {
      state.markers = markers;
    },
    setEquipmentStateHistory(
      state,
      history: Record<string, EquipmentStateHistory[]>
    ) {
      state.equipmentStateHistory = history;
    },
    setStateDefinitions(
      state,
      definitions: Record<string, { name: string; color: string }>
    ) {
      state.stateDefinitions = definitions;
    },
    setEquipmentDetails(state, details: Record<string, EquipmentDetails>) {
      state.equipmentDetails = details;
    },
    setLatestStates(state, latestStates: Record<string, string>) {
      state.latestStates = latestStates;
    },
  },

  actions: {
    async loadMarkers({ commit }) {
      try {
        const positionsResponse = await fetch(
          "/data/equipmentPositionHistory.json"
        );
        const positionsData = await positionsResponse.json();

        const statesResponse = await fetch("/data/equipmentStateHistory.json");
        const statesData = await statesResponse.json();

        const stateDefinitionsResponse = await fetch(
          "/data/equipmentState.json"
        );
        const stateDefinitionsData = await stateDefinitionsResponse.json();

        const equipmentResponse = await fetch("/data/equipment.json");
        const equipmentData: Equipment[] = await equipmentResponse.json();

        const equipmentModelResponse = await fetch("/data/equipmentModel.json");
        const equipmentModelData: EquipmentModel[] =
          await equipmentModelResponse.json();

        // maps the most recent states for each equipment."
        const latestStates: Record<string, string> = statesData.reduce(
          (acc: Record<string, string>, equipment: any) => {
            const latestState = equipment.states.sort(
              (a: any, b: any) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )[0];
            acc[equipment.equipmentId] = latestState.equipmentStateId;
            return acc;
          },
          {}
        );

        // associates the state IDs with their names and colors
        stateMap = stateDefinitionsData.reduce(
          (
            acc: Record<string, { name: string; color: string }>,
            state: any
          ) => {
            acc[state.id] = { name: state.name, color: state.color };
            return acc;
          },
          {}
        );

        // processes the position data to obtain the markers.
        const markers: Marker[] = positionsData.map((equipment: any) => {
          const latestPosition = equipment.positions.sort(
            (a: any, b: any) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )[0];

          const equipmentId = equipment.equipmentId;
          const equipmentStateId = latestStates[equipmentId];
          const stateInfo = stateMap[equipmentStateId] || {
            name: "Desconhecido",
            color: "transparent",
          };

          return {
            position: [latestPosition.lat, latestPosition.lon] as [
              number,
              number
            ],
            content: `Equipamento ID: ${equipmentId}<br>Estado: <span style="color: ${stateInfo.color}; font-weight: bolder;">${stateInfo.name}</span>`,
            equipmentId,
          };
        });

        const equipmentDetails: Record<string, EquipmentDetails> =
          equipmentData.reduce(
            (acc: Record<string, EquipmentDetails>, equipment: Equipment) => {
              const equipmentModelId = equipment.equipmentModelId;
              const model = equipmentModelData.find(
                (model: EquipmentModel) => model.id === equipmentModelId
              );

              acc[equipment.id] = {
                name: equipment.name,
                modelName: model ? model.name : "Modelo desconhecido",
              };
              return acc;
            },
            {}
          );

        // maps the states of each equipment, cross-referencing with the stateDefinitions data
        const equipmentStateHistory: Record<string, EquipmentStateHistory[]> =
          statesData.reduce(
            (acc: Record<string, EquipmentStateHistory[]>, equipment: any) => {
              acc[equipment.equipmentId] = equipment.states.map(
                (state: any) => ({
                  date: state.date,
                  name:
                    stateMap[state.equipmentStateId]?.name || "Desconhecido",
                  color:
                    stateMap[state.equipmentStateId]?.color || "transparent",
                })
              );
              return acc;
            },
            {}
          );

        commit("setMarkers", markers);
        commit("setEquipmentStateHistory", equipmentStateHistory);
        commit("setStateDefinitions", stateMap);
        commit("setEquipmentDetails", equipmentDetails);
        commit("setLatestStates", latestStates);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
  },
  getters: {
    getMarkers(state) {
      return state.markers;
    },
    getEquipmentStateHistory: (state) => (equipmentId: string) => {
      return state.equipmentStateHistory[equipmentId] || [];
    },
    getEquipmentDetails: (state) => (equipmentId: string) => {
      return state.equipmentDetails[equipmentId] || { name: "", modelName: "" };
    },
    getLatestStates(state) {
      return state.latestStates;
    },
  },
});
