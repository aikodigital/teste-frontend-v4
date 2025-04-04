import type { CorPorStatus } from '@/types/Cor'
import { ref } from 'vue'

import equipmentState from '@/../data/equipmentState.json'
import { defineStore } from 'pinia'

export const useCorStore = defineStore('cor', () => {
  const corPorStatus = ref<CorPorStatus>({})

  const carregarCores = () => {
    equipmentState.forEach((es) => {
      corPorStatus.value[es.name!] = es.color!
    })
  }

  const obterCorPorStatus = (nome: string) => {
    return corPorStatus.value[nome]
  }

  carregarCores()

  return { corPorStatus, obterCorPorStatus }
})
