import dynamic from 'next/dynamic'

import { api } from '../../../../../data/api'
import BackToHomeButton from '../../shared/layout/BackToHomeButton'
import Header from '../../shared/layout/Header'
import TableHistory from '../../shared/layout/Table/TableHistory'
import * as S from './styled'

interface ProductProps {
  params: {
    id: string
  }
}
interface State {
  date: string
  activeState: 'Operando' | 'Manutenção' | 'Parado'
  price: {
    equipmentStateId?: string
    value: number
  }
}

interface Equipment {
  equipmentId?: string
  states: State[]
}

export async function getProduct(params: string) {
  const response = await api(`/equipments/${params}/`, {
    next: {
      revalidate: 60 * 60
    }
  })

  const product = await response.json()

  return product
}

export async function getLocation(params: string) {
  const response = await api(`/locations/${params}/`, {
    next: {
      revalidate: 60 * 60
    }
  })

  const product = await response.json()

  return product
}

export function calculateEquipmentGains(equipments: Equipment[]) {
  return equipments.map(equipment => {
    const { operatingGain, maintenanceGain, stopedGain } =
      equipment.states.reduce(
        (acc, currentState, index, array) => {
          if (index === array.length - 1) return acc

          const nextState = array[index + 1]

          const currentDate = new Date(currentState.date)
          const nextDate = new Date(nextState.date)

          const timeDifference =
            (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60)

          if (currentState.activeState === 'Operando') {
            acc.operatingTime += timeDifference
            acc.operatingGain += timeDifference * currentState.price.value
          } else if (currentState.activeState === 'Manutenção') {
            acc.maintenanceTime += timeDifference
            acc.maintenanceGain += timeDifference * currentState.price.value
          } else {
            acc.stopedTime += timeDifference
            acc.stopedGain += timeDifference * currentState.price.value
          }

          return acc
        },
        {
          operatingTime: 0,
          maintenanceTime: 0,
          stopedTime: 0,
          operatingGain: 0,
          maintenanceGain: 0,
          stopedGain: 0
        }
      )

    const totalGain = operatingGain + maintenanceGain + stopedGain

    return {
      totalGain
    }
  })
}

export function calculateEquipmentProduction(equipments: Equipment[]) {
  return equipments.map(equipment => {
    const { totalHours, operationalHours } = equipment.states.reduce(
      (acc, currentState, index, array) => {
        if (index === array.length - 1) return acc

        const nextState = array[index + 1]

        const currentDate = new Date(currentState.date)
        const nextDate = new Date(nextState.date)
        const timeDifference =
          (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60)

        acc.totalHours += timeDifference

        if (currentState.activeState === 'Operando') {
          acc.operationalHours += timeDifference
        }

        return acc
      },
      {
        totalHours: 0,
        operationalHours: 0
      }
    )

    const productivity = (operationalHours / totalHours) * 100

    return productivity.toFixed(2)
  })
}

export default async function DetailSection({ params }: ProductProps) {
  const product = await getProduct(params.id)

  const location = await getLocation(params.id)

  const activeLocation = location.positions[location.positions.length - 1]
  const positions = location.positions

  const gains = calculateEquipmentGains(product)

  const totalGains = gains.map(gain => gain.totalGain)

  const productivity = calculateEquipmentProduction(product)

  const formatedGains = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalGains[0])

  const Map = dynamic(() => import('../../shared/layout/Map'), {
    ssr: false,
    loading: () => <p>Carregando...</p>
  })

  return (
    <>
      <Header />
      <BackToHomeButton />
      <S.Container>
        <Map local={activeLocation} positions={positions} />
        <S.HeaderTableContainer>
          <S.Title>Histórico do equipamento</S.Title>
          <div>
            <p>
              Ganho total: <strong>{formatedGains}</strong>
            </p>
            <p>
              Produtividade: <strong>{productivity}%</strong>
            </p>
          </div>
        </S.HeaderTableContainer>
        <TableHistory equipment={product} />
      </S.Container>
    </>
  )
}
