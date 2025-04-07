import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { EquipmentState } from '@/types/equipment'

type EquipmentStateHistoryProps = {
  equipmentId: string
  clearItem: () => void
  equipmentName: string
  model: string
}

export default function EquipmentStateHistory({
  equipmentId,
  clearItem,
  equipmentName,
  model
}: EquipmentStateHistoryProps) {
  const [states, setStates] = useState<EquipmentState[]>([])
  const stateLegend = useSelector((state: RootState) => state.stateLegend.data)
  const loadingLegend = useSelector(
    (state: RootState) => state.stateLegend.loading
  )

  useEffect(() => {
    fetch('/data/equipmentStateHistory.json')
      .then(res => res.json())
      .then((data: { equipmentId: string; states: EquipmentState[] }[]) => {
        const found = data.find(item => item.equipmentId === equipmentId)
        setStates(found?.states || [])
      })
      .catch(err =>
        console.error('Erro ao carregar histórico de estados:', err)
      )
  }, [equipmentId])

  return (
    <div className="p-4 border rounded-md shadow bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Histórico de Estados</h2>
        <button
          onClick={clearItem}
          title="Fechar"
          className="px-3 py-1 rounded bg-gray-100 border border-gray-300 hover:bg-gray-200"
        >
          x
        </button>
      </div>

      <hr />
      <span>
        <ul className="space-y-2 my-3 text-sm ">
          <li>
            <b>Equipamento:</b> {equipmentName}
          </li>
          <li>
            <b>ID:</b> {equipmentId}
          </li>
          <li>
            <b>Modelo:</b> {model}
          </li>
        </ul>
      </span>
      <hr />

      {loadingLegend ? (
        <p className="text-sm text-gray-500">Carregando legenda...</p>
      ) : states.length > 0 ? (
        <ul className="text-sm space-y-2 max-h-64 overflow-y-auto font-light mt-3">
          {states
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((state, index) => {
              const legend = stateLegend[state.equipmentStateId]
              return (
                <li key={index}>
                  {new Date(state.date).toLocaleString()} (
                  <span
                    className="font-medium"
                    style={{ color: legend?.color ?? '#000' }}
                  >
                    {legend?.name ??
                      `Estado desconhecido (${state.equipmentStateId})`}
                  </span>
                  )
                </li>
              )
            })}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">Nenhum estado encontrado.</p>
      )}
    </div>
  )
}
