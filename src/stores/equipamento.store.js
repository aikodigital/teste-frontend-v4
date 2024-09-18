import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import Equipamentos from "../data/equipment.json";
import ModeloEquipamentos from "../data/equipmentModel.json";
import PosicaoEquipamentos from "../data/equipmentPositionHistory.json";
import StatusEquipamentos from "../data/equipmentState.json";
import HistoricoEquipamentos from "../data/equipmentStateHistory.json";

export const useEquipamentoStore = defineStore("equipamentoStore", () => {
  const isLoading = ref(false);

  const equipamentos = ref([]);

  const equipamentoDetalhes = ref([]);

  function getEquipamentos() {
    isLoading.value = true;
    const data = buildEquipamentos();
    setEquipamentos(data);
    return data;
  }

  function buildEquipamentos() {
    const arrayEquipamentos = Equipamentos.map((eq) => {
      return {
        idEquipamento: eq.id,
        nomeEquipamento: eq.name,
        modeloEquipamento: ModeloEquipamentos.filter(
          (v) => v.id === eq.equipmentModelId
        )[0],
        posicoesEquipamento: PosicaoEquipamentos.filter(
          (v) => v.equipmentId === eq.id
        )[0].positions,
        historicoEquipamento: HistoricoEquipamentos.filter(
          (v) => v.equipmentId === eq.id
        )[0].states.sort((a, b) => new Date(b.date) - new Date(a.date)),
      };
    });

    arrayEquipamentos.forEach((ae, index) => {
      const newStates = ae.historicoEquipamento.map((sr) => {
        const state = StatusEquipamentos.filter(
          (se) => se.id === sr.equipmentStateId
        )[0];
        return {
          date: sr.date,
          equipmentStateId: sr.equipmentStateId,
          stateName: state.name,
          stateColor: state.color,
        };
      });
      arrayEquipamentos[index].historicoEquipamento = newStates;
    });
    return arrayEquipamentos;
  }

  function getEquipamentoDetalhes(id) {
    isLoading.value = true;
    const data = equipamentos.value.filter((v) => v.idEquipamento === id)[0];
    setEquipamentoDetalhes(data);
    return data;
  }

  const setEquipamentos = (value) => {
    equipamentos.value = value;
  };

  const setEquipamentoDetalhes = (value) => {
    equipamentoDetalhes.value = value;
  };

  // make sure to pass the right store definition, `useAuth` in this case.

  return {
    equipamentos,
    equipamentoDetalhes,
    getEquipamentos,
    getEquipamentoDetalhes,
    isLoading,
  };
});
