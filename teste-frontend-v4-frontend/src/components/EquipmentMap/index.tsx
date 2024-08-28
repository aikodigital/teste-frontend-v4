import { useRef, useState } from 'react'
import { Map } from 'leaflet'
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet'

import { TPosition } from '@interfaces/equipmentPositionHistory.interface'
import { IFullEquipment } from '@interfaces/fullEquipment.interface'

import createMapLines from '@services/createMapLines'

import useEquipmentIcons from '@hooks/useEquipmentIcons'

export type TMarker = { lat: number; lng: number }

interface IMapProps {
  equipment: IFullEquipment
  positions: TPosition[]
}

const EquipmentMap = ({ equipment, positions }: IMapProps) => {
  const mapRef = useRef<Map>(null)

  const [positionIndex, setPositionIndex] = useState(0)

  const { EquipmentIcon } = useEquipmentIcons(
    equipment.state,
    equipment.equipmentModel
  )

  const multiPolyline = createMapLines(positions)

  const handleLastMarker = () => {
    if (positionIndex + 1 < positions.length) {
      const newPos = positions[positionIndex + 1]
      mapRef.current?.setView({ lat: newPos.lat, lng: newPos.lon }, 15, {
        animate: true,
        duration: 2
      })

      setPositionIndex((i) => {
        return i + 1
      })
    }
  }

  const handleNextMarker = () => {
    if (positionIndex - 1 >= 0) {
      const newPos = positions[positionIndex - 1]
      mapRef.current?.setView({ lat: newPos.lat, lng: newPos.lon }, 15, {
        animate: true,
        duration: 2
      })
      setPositionIndex((i) => {
        return i - 1
      })
    }
  }

  const handleFirstMarker = () => {
    const newPos = positions[positions.length - 1]
    mapRef.current?.setView({ lat: newPos.lat, lng: newPos.lon }, 15, {
      animate: true,
      duration: 2
    })
    setPositionIndex(positions.length - 1)
  }

  const handleResetMarker = () => {
    const newPos = positions[0]
    mapRef.current?.setView({ lat: newPos.lat, lng: newPos.lon }, 15, {
      animate: true,
      duration: 2
    })
    setPositionIndex(0)
  }

  return (
    <div className="bg-white rounded-lg shadow-md select-none">
      <div className="p-4 pb-2">
        <h1 className="flex gap-2 text-lg font-bold">
          <svg className="w-4" viewBox="0 0 512 512">
            <path d="M512 96c0 50.2-59.1 125.1-84.6 155c-3.8 4.4-9.4 6.1-14.5 5L320 256c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c53 0 96 43 96 96s-43 96-96 96l-276.4 0c8.7-9.9 19.3-22.6 30-36.8c6.3-8.4 12.8-17.6 19-27.2L416 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0c-53 0-96-43-96-96s43-96 96-96l39.8 0c-21-31.5-39.8-67.7-39.8-96c0-53 43-96 96-96s96 43 96 96zM117.1 489.1c-3.8 4.3-7.2 8.1-10.1 11.3l-1.8 2-.2-.2c-6 4.6-14.6 4-20-1.8C59.8 473 0 402.5 0 352c0-53 43-96 96-96s96 43 96 96c0 30-21.1 67-43.5 97.9c-10.7 14.7-21.7 28-30.8 38.5l-.6 .7zM128 352a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM416 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
          </svg>
          Posição do equipamento
        </h1>
        <div className="flex flex-row gap-4">
          <span
            className="cursor-pointer hover:underline"
            onClick={handleFirstMarker}
          >
            primeiro registro
          </span>
          <span
            className="cursor-pointer hover:underline"
            onClick={handleLastMarker}
          >
            anterior
          </span>
          <span>
            {new Date(positions[positionIndex].date).toLocaleString()}
          </span>
          <span
            className="cursor-pointer hover:underline"
            onClick={handleNextMarker}
          >
            proximo
          </span>
          <span
            className="cursor-pointer hover:underline"
            onClick={handleResetMarker}
          >
            ultima registrada
          </span>
        </div>
      </div>

      <MapContainer
        ref={mapRef}
        center={{ lat: positions[0].lat, lng: positions[0].lon }}
        zoom={15}
        className="h-[400px] rounded-b-lg"
      >
        <Polyline
          pathOptions={{ color: '#9ca3af', weight: 0.8 }}
          positions={multiPolyline}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions.map(({ lat, lon }, i) => (
          <Marker
            key={`marker_${i}`}
            position={{ lat: lat, lng: lon }}
            icon={EquipmentIcon}
          ></Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default EquipmentMap
