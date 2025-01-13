import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const loading = ref<boolean>(false)

  return {
    loading,
  }
})
