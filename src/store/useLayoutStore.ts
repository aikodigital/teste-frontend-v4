import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore("layoutStore", () => {
  const showSidebar = ref(true);
  const showHeader = ref(true);
  const showFooter = ref(true);

  function toggleSidebar() {
    showSidebar.value = !showSidebar.value;
  }

  function toggleHeader() {
    showHeader.value = !showHeader.value;
  }

  function toggleFooter() {
    showFooter.value = !showFooter.value;
  }

  return {
    showSidebar,
    showHeader,
    showFooter,
    toggleSidebar,
    toggleHeader,
    toggleFooter,
  };
});
