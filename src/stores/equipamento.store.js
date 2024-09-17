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
    debugger;
    const arrayEquipamentos = Equipamentos.map((eq) => {
      return {
        idEquipamento: eq.id,
        nomeEquipamento: eq.name,
        modeloEquipamento: ModeloEquipamentos.filter(
          (v) => v.id === eq.equipmentModelId
        ),
        posicaoEquipamento: PosicaoEquipamentos.filter(
          (v) => v.equipmentId === eq.id
        ),
        historicoEquipamento: HistoricoEquipamentos.filter(
          (v) => v.equipmentId === eq.id
        ),
      };
    });
    return arrayEquipamentos;
  }

  // function getEquipamentoDetalhes(id) {
  //   isLoading.value = true;
  //   const data = Equipamentos
  //   setEquipamentos(data);
  //   return data;
  // }

  const setEquipamentos = (value) => {
    equipamentos.value = value;
  };

  // make sure to pass the right store definition, `useAuth` in this case.

  return {
    equipamentos,
    equipamentoDetalhes,
    getEquipamentos,
    isLoading,
  };
});
