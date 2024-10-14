'use client'
import { useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useModel } from '@/store/useStore'

import 'leaflet/dist/leaflet.css'

import {
  getEquipmentLatestPosition,
  getEquipmentName,
  getEquipmentModel,
  getEquipmentLatestState,
} from '@/data/get/equipment-utils'
import { equipmentPositionsHistory } from '@/data/equipmentPositionHistory'
import { equipment } from '@/data/equipment'
import Link from 'next/link'
import { Icon } from 'leaflet'

const HouseIcon = new Icon({
  iconUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [22, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

export default function Highlight() {
  const { selectedModel, selectedStatus } = useModel()

  const filteredEquipmentPositionsHistory = useMemo(() => {
    const filteredEquipments =
      selectedModel === 'all'
        ? equipment
        : equipment.filter((eq) => eq.equipmentModelId === selectedModel)

    const equipmentWithStatus = filteredEquipments.filter((eq) => {
      const latestState = getEquipmentLatestState(eq.id)
      if (!latestState) return false
      return selectedStatus === 'all' || latestState.id === selectedStatus
    })

    return equipmentPositionsHistory.filter((position) =>
      equipmentWithStatus.some((eq) => eq.id === position.equipmentId),
    )
  }, [selectedModel, selectedStatus])

  return (
    <main>
      <MapContainer
        center={[-19.126536, -45.947756]}
        zoom={10}
        minZoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution=""
          url={'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'}
        />

        {filteredEquipmentPositionsHistory.length > 0 ? (
          filteredEquipmentPositionsHistory.map((equipment) => (
            <Marker
              key={equipment.equipmentId}
              position={getEquipmentLatestPosition(equipment.positions)}
              icon={HouseIcon}
            >
              <Popup>
                <p className="text-base font-bold">
                  Nome: {getEquipmentName(equipment.equipmentId)}
                </p>
                <p className="text-base font-bold">
                  Modelo: {getEquipmentModel(equipment.equipmentId)}
                </p>
                <p className="text-base font-bold">
                  Estado:
                  <span
                    style={{
                      color: getEquipmentLatestState(equipment.equipmentId)
                        ?.color,
                      fontWeight: 900,
                      marginLeft: 4,
                    }}
                  >
                    {getEquipmentLatestState(equipment.equipmentId)?.name ||
                      'Estado não encontrado'}
                  </span>
                </p>

                <div className="w-full  flex justify-center  m-1 ">
                  <Link
                    href={`/equipments/${equipment.equipmentId}`}
                    className="bg-primary font-bold text-black p-2 px-4 rounded-md"
                  >
                    <span className="text-black font-bold">Detalhes</span>
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))
        ) : (
          <p>Nenhum equipamento encontrado para este status e modelo.</p>
        )}
      </MapContainer>
    </main>
  )
}
