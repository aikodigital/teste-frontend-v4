import type {
  Equipamento,
  Estado,
  Ganho,
  Modelo,
  Posicao,
  RegistroEstado,
} from '@/types/Equipamento'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

import equipment from '@/../data/equipment.json'
import equipmentModel from '@/../data/equipmentModel.json'
import equipmentPositionHistory from '@/../data/equipmentPositionHistory.json'
import equipmentState from '@/../data/equipmentState.json'
import equipmentStateHistory from '@/../data/equipmentStateHistory.json'
import type { Filtro } from '@/types/Filtro'

export const useEquipamentoStore = defineStore('equipamento', () => {
  const equipamentos = ref<Equipamento[]>([])
  const filtro = ref<Filtro>({
    'Nome do equipamento': '',
    Modelo: '',
    'Último status': '',
  })

  const _carregarEquipamentos = () => {
    equipment.forEach((e) => {
      let model = equipmentModel.find((f) => f.id == e.equipmentModelId)
      let ganhos: Ganho[] = []

      model!.hourlyEarnings.forEach((he) => {
        let state = equipmentState.find((f) => f.id == he.equipmentStateId)
        const estado: Estado = {
          nome: state!.name,
          cor: state!.color,
        }

        const ganho: Ganho = {
          estado: estado,
          valor: he.value,
        }

        ganhos.push(ganho)
      })

      const modelo: Modelo = {
        id: e.equipmentModelId,
        nome: model!.name,
        ganhos: ganhos,
      }

      let registros: RegistroEstado[] = []
      let stateHistory = equipmentStateHistory.find((f) => f.equipmentId == e.id)
      stateHistory!.states.forEach((sh) => {
        let state = equipmentState.find((f) => f.id == sh.equipmentStateId)
        const estado: Estado = {
          nome: state!.name,
          cor: state!.color,
        }

        const registro: RegistroEstado = {
          data: new Date(sh.date),
          estado: estado,
        }

        registros.push(registro)
      })

      let posicoes: Posicao[] = []
      let positionHistory = equipmentPositionHistory.find((f) => f.equipmentId == e.id)
      positionHistory!.positions.forEach((ph) => {
        const posicao: Posicao = {
          data: new Date(ph.date),
          latitude: ph.lat,
          longitude: ph.lon,
        }

        posicoes.push(posicao)
      })

      const equipamento: Equipamento = {
        id: e.id,
        nome: e.name,
        modelo: modelo,
        registros: registros,
        posicoes: posicoes,
      }

      equipamentos.value.push(reactive(equipamento))
    })
  }

  const _filtrar = () => {
    equipamentos.value.forEach((e) => {
      const ultimoStatus: RegistroEstado = e.registros[e.registros.length - 1]
      let exibirEquipamento = true

      if (!e.nome.includes(filtro.value['Nome do equipamento'])) {
        exibirEquipamento = false
      }

      if (
        filtro.value.Modelo !== null &&
        filtro.value.Modelo.length > 0 &&
        filtro.value.Modelo != e.modelo.nome
      ) {
        exibirEquipamento = false
      }

      if (
        filtro.value['Último status'] !== null &&
        filtro.value['Último status'].length > 0 &&
        filtro.value['Último status'] != ultimoStatus.estado.nome
      ) {
        exibirEquipamento = false
      }

      e.exibirNoMapaAoVivo = exibirEquipamento

      if (!e.exibirNoMapaAoVivo && e.exibirDetalhes) {
        e.exibirDetalhes = false
      }
    })
  }

  const exibirDetalhes = (nome: string) => {
    const equipamento: Equipamento = equipamentos.value.find((f) => f.nome == nome)!

    equipamentos.value.filter((f) => f.nome != nome).forEach((e) => (e.exibirDetalhes = false))
    equipamento.exibirDetalhes = !equipamento.exibirDetalhes
  }

  const ocultarDetalhes = (nome: string) => {
    equipamentos.value.find((f) => f.nome == nome)!.exibirDetalhes = false
  }

  const listarModelos = () => {
    return equipmentModel.map((m) => m.name)
  }

  const listarStatus = () => {
    return equipmentState.map((m) => m.name)
  }

  const filtrarPorNome = (nome: string) => {
    filtro.value['Nome do equipamento'] = nome
    _filtrar()
  }

  const filtrarPorModelo = (modelo: string) => {
    filtro.value.Modelo = modelo
    _filtrar()
  }

  const filtrarPorUltimoStatus = (ultimoStatus: string) => {
    filtro.value['Último status'] = ultimoStatus
    _filtrar()
  }

  _carregarEquipamentos()

  return {
    equipamentos,
    exibirDetalhes,
    ocultarDetalhes,
    listarModelos,
    listarStatus,
    filtrarPorNome,
    filtrarPorModelo,
    filtrarPorUltimoStatus,
  }
})
