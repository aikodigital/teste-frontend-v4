import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSidebarStore = defineStore(
  "sidebarStore",
  () => {
    const drawer = ref<boolean>(false);
    const rail = ref<boolean>(false);
    const selectedMenuItem = ref("");

    function toggleRail() {
      rail.value = !rail.value;
    }

    function resetState() {
      rail.value = false;
      selectedMenuItem.value = "/dashboard";
    }

    function setDrawer(value: boolean): void {
      drawer.value = value;
      sessionStorage.setItem("drawer", drawer.value.toString());
    }

    const getRail = computed(() => rail.value);
    const getSelectedItem = computed(() => selectedMenuItem.value);

    return {
      drawer,
      rail,
      setDrawer,
      toggleRail,
      getRail,
      selectedMenuItem,
      getSelectedItem,
      resetState,
    };
  },
  {
    persist: true,
  }
);
