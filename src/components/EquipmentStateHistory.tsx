import { useEffect, useState } from 'react'
import { getStateById } from '../utils/stateUtils'
import equipmentStateHistory from '../data/equipmentStateHistory.json'
import type {
  EquipmentStateHistoryProps,
  StateHistoryEntry,
} from '../types/Equipment'

const EquipmentStateHistory = ({
  equipmentId,
  onClose,
}: EquipmentStateHistoryProps) => {
  const [history, setHistory] = useState<StateHistoryEntry[]>([])

  useEffect(() => {
    const equipmentHistory = equipmentStateHistory.find(
      (history) => history.equipmentId === equipmentId
    )

    if (equipmentHistory) {
      const formattedHistory = equipmentHistory.states.map((entry) => {
        const { name, color } = getStateById(entry.equipmentStateId)
        return {
          id: `${equipmentId}-${entry.date}-${entry.equipmentStateId}`,
          timestamp: new Date(entry.date).toLocaleString(),
          state: name,
          color: color,
        }
      })

      setHistory(formattedHistory)
    } else {
      console.error(
        `Histórico de equipamento com ID ${equipmentId} não encontrado.`
      )
    }
  }, [equipmentId])

  return (
    <div className="state-history-modal">
      <button type="button" onClick={onClose}>
        Fechar
      </button>
      <h3 className="text-black text-lg font-medium mb-4">
        Histórico de Estados
      </h3>
      <ul>
        {history.length > 0 ? (
          history.map((entry) => (
            <li
              key={entry.id}
              style={{
                backgroundColor: entry.color,
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '5px',
              }}
            >
              {`${entry.timestamp}: ${entry.state}`}
            </li>
          ))
        ) : (
          <li>Nenhum histórico encontrado.</li>
        )}
      </ul>
    </div>
  )
}

export default EquipmentStateHistory
