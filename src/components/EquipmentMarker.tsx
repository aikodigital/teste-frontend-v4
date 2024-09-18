import { useState } from 'react'
import { Marker, Popup } from 'react-leaflet'
import EquipmentStateHistory from './EquipmentStateHistory'
import type { EquipmentMarkerProps } from '../types/Equipment'

export default function EquipmentMarker({
  equipment,
  onClick,
}: EquipmentMarkerProps) {
  const { name, position, state } = equipment
  const [showHistory, setShowHistory] = useState(false)

  if (!position || position.lat === undefined || position.lng === undefined) {
    console.error(
      `Posição do equipamento ${name} está indefinida ou incompleta`,
      equipment
    )
    return null
  }

  return (
    <>
      <Marker
        position={[position.lat, position.lng]}
        eventHandlers={{ click: onClick }}
      >
        <Popup>
          <strong>{name}</strong>
          <p>Estado atual: {state || 'Não disponível'}</p>

          <button type="button" onClick={() => setShowHistory((prev) => !prev)}>
            {showHistory ? 'Fechar Histórico' : 'Ver Histórico'}
          </button>
        </Popup>
      </Marker>

      {showHistory && (
        <div className="history-overlay">
          <EquipmentStateHistory
            equipmentId={equipment.id}
            onClose={() => setShowHistory(false)}
          />
        </div>
      )}
    </>
  )
}
