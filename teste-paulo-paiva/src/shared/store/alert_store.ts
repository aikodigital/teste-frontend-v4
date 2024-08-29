import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAlertStore = defineStore("alert", () => {
  const isDialogVisible = ref<boolean>(false);
  const alertMessage = ref<string | undefined>("");
  const alertMessageEmpytList = ref<string | undefined>("");
  const typeAlert = ref<boolean>(false);
  const hasSearchParams = ref<boolean>(false);

  function showDialogAlert(message?: string) {
    isDialogVisible.value = true;
    typeAlert.value = false;
    message === undefined
      ? (alertMessage.value = "Ocorreu um erro. Tente Novamente.")
      : (alertMessage.value = message);
  }

  function showSuccessMessage(message?: string) {
    isDialogVisible.value = true;
    typeAlert.value = true;
    alertMessage.value = message ?? "Operação realizada com sucesso.";
  }

  function hideDialogAlert() {
    isDialogVisible.value = false;
  }
  function alertNoRegistration(list: object[]) {
    if (list.length === 0 && hasSearchParams.value === true) {
      return (alertMessageEmpytList.value = "! Nenhum dado encontrado.");
    }
    if (list.length === 0) {
      return (alertMessageEmpytList.value = "Listagem vazia.");
    }
    return null;
  }

  const getAlertDialog = computed(() => isDialogVisible.value);
  const getAlertMessage = computed(() => alertMessage.value);
  const getTypeAlert = computed(() => typeAlert.value);

  return {
    isDialogVisible,
    alertMessage,
    showDialogAlert,
    hideDialogAlert,
    getAlertDialog,
    getAlertMessage,
    showSuccessMessage,
    getTypeAlert,
    hasSearchParams,
    alertNoRegistration,
    alertMessageEmpytList,
  };
});
