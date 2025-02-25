type SnackbarType = 'success' | 'warning' | 'error' | 'info'

export const useSnackbarStore = defineStore("snackbar", {
  state: () => ({
    show: false,
    message: "",
    color: "success" as SnackbarType,
    timeout: 3000
  }),
  actions: {
    openSnackbar(message: string, color: SnackbarType, timeout: number = 3000) {
      this.message = message;
      this.color = color;
      this.timeout = timeout;
      this.show = true;
    },
    closeSnackbar() {
      this.show = false;
    }
  }
});