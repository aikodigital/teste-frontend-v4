import { defineStore } from "pinia";
import { ref } from "vue";

export const useNavbarStore = defineStore(
  "navbarStore",
  () => {
    const userName = ref<string>("");
    const userRole = ref<string>("");

    return {
      userName,
      userRole,
    };
  },
  {
    persist: true,
  }
);
