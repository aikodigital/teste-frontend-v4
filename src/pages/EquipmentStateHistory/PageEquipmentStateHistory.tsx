import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getEquipment,
  getEquipmentState,
  getEquipmentStateHistory
} from '../../api/serviceApi'

import Header from '@/components/header/Header'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { EquipmentProps, EquipmentStateProps } from '@/models/Equipment'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface EquipmentStateHistoryProps {
  equipment: EquipmentProps
  date: string
  equipmentStateId: string
  state?: EquipmentStateProps
}

export default function PageEquipmentStateHistory() {
  const [equipmentStateHistory, setEquipmentStateHistory] = useState<
    EquipmentStateHistoryProps[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      StateHistory(id)
    }
  }, [id])

  async function StateHistory(id: string) {
    try {
      setLoading(true)
      const equipmentState = await getEquipmentStateHistory(id)
      const typeState = await getEquipmentState()
      const equipmentName = await getEquipment()

      const state = equipmentState[0].states.map(
        (states: EquipmentStateHistoryProps) => {
          const stateName = typeState.find(
            (stateType: EquipmentStateProps) =>
              stateType.id === states.equipmentStateId
          )
          states.state = stateName

          const equipment = equipmentName.find(
            (equipmentName: EquipmentProps) => equipmentName.id === id
          )
          states.equipment = equipment
          return states
        }
      )

      state.sort(
        (a: EquipmentStateHistoryProps, b: EquipmentStateHistoryProps) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
      )
      setEquipmentStateHistory(state)
    } catch (error) {
      setLoading(false)
      console.log('Erro ao buscar o estado do equipamento', error)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }

  return (
    <div className='container m-auto max-w-5xl justify-center justify-items-center'>
      <Header className='relative mb-4 rounded-md bg-sky-600'>
        <span className='text-2xl font-bold'>
          Histórico de Estado do Equipamento
        </span>
      </Header>

      {loading ? (
        <div className='flex items-center justify-center'>
          <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900'></div>
        </div>
      ) : (
        <Table>
          <TableCaption>Estado do Equipamento</TableCaption>
          <TableHeader className='text-xl'>
            <TableRow>
              <TableHead>Equipamento</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipmentStateHistory.map((stateHistory, index) => (
              <TableRow key={index}>
                {<TableCell>{stateHistory.equipment.name}</TableCell>}
                <TableCell>
                  <Badge
                    variant='outline'
                    style={{ color: stateHistory.state?.color }}
                  >
                    {stateHistory.state?.name}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(stateHistory.date), 'PPpp', {
                    locale: ptBR
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
