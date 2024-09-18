import { useEffect, useState } from 'react'
import MapView from './components/MapView'
import EquipmentStateHistory from './components/EquipmentStateHistory'
import type { Equipment } from './types/Equipment'
import './index.css'

export function App() {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([])
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  )
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    fetch('./src/data/equipment.json')
      .then((response) => response.json())
      .then((data) => {
        setEquipmentList(data)
      })
      .catch((error) => console.error('Erro ao obter os dados', error))
  }, [])

  const handleShowHistory = (equipment: Equipment) => {
    setSelectedEquipment(equipment)
    setShowHistory(true)
  }

  const handleCloseHistory = () => {
    setShowHistory(false)
    setSelectedEquipment(null)
  }

  return (
    <div>
      <MapView
        equipmentList={equipmentList}
        onMarkerClick={handleShowHistory}
      />
      {showHistory && selectedEquipment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              type="button"
              onClick={handleCloseHistory}
              className="btn btn-close"
            />
            <EquipmentStateHistory
              equipmentId={selectedEquipment.id}
              onClose={handleCloseHistory}
            />
          </div>
        </div>
      )}
    </div>
  )
}
