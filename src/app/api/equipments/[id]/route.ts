import { NextResponse } from 'next/server'
import { z } from 'zod'

import earnysPerHour from '../../../../../data/equipmentModel.json'
import statesTypes from '../../../../../data/equipmentState.json'
import data from '../../../../../data/equipmentStateHistory.json'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  // Simulação de atraso para requisição
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Validação do ID
  const id = z.string().nullish().parse(params.id)

  // Filtrando os dados de histórico de estado pelo ID do equipamento
  const getDataFromId = data.filter(e => e.equipmentId === id)

  // Criando a fusão entre os estados do equipamento e os tipos de estado
  const MergedEquipments = getDataFromId.map(equipment => {
    // Mapeando os estados com seus tipos
    const mappedStates = equipment.states.map(state => {
      const stateType = statesTypes.find(e => e.id === state.equipmentStateId)

      const priceOperating = earnysPerHour.find(e => e.name)

      const price = priceOperating?.hourlyEarnings.find(
        e => e.equipmentStateId === state.equipmentStateId
      )

      return {
        ...state,
        activeState: stateType?.name,
        price
      }
    })

    // Retornando o equipamento com os estados mapeados
    return {
      ...equipment,
      states: mappedStates
    }
  })

  // Retornando o equipamento encontrado
  return NextResponse.json(MergedEquipments)
}
