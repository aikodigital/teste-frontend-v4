import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import EquipmentMarker from './EquipmentMarker'
import EquipmentDetails from './EquipmentDetails'
import type { Equipment, MapViewProps } from '../types/Equipment'
import positionHistory from '../data/equipmentPositionHistory.json'
import { getLatestPosition } from '../utils/dataUtils'
import 'leaflet/dist/leaflet.css'

export default function MapView({ equipmentList }: MapViewProps) {
  const [equipmentWithPosition, setEquipmentWithPosition] = useState<
    Equipment[]
  >([])
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(
    null
  )

  useEffect(() => {
    const updatedEquipmentList = equipmentList.map((equipment) => {
      const latestPosition = getLatestPosition(equipment.id, positionHistory)
      return {
        ...equipment,
        position: latestPosition
          ? { lat: latestPosition.lat, lng: latestPosition.lon }
          : equipment.position,
      }
    })

    setEquipmentWithPosition(updatedEquipmentList)
  }, [equipmentList])

  const handleMarkerClick = (equipment: Equipment) => {
    setSelectedEquipmentId(equipment.id)
  }

  return (
    <div style={{ display: 'flex' }}>
      <MapContainer
        center={[-19.1, -46]}
        zoom={11}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {equipmentWithPosition.map((equipment) => (
          <EquipmentMarker
            key={equipment.id}
            equipment={equipment}
            onClick={() => handleMarkerClick(equipment)}
          />
        ))}
      </MapContainer>
      {selectedEquipmentId && (
        <div style={{ width: '20%', padding: '20px' }}>
          <EquipmentDetails equipmentId={selectedEquipmentId} />
        </div>
      )}
    </div>
  )
}
