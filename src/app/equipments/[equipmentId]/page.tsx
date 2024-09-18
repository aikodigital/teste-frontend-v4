'use client'

import {
  getEquipmentName,
  getEquipmentModel,
  getEquipmentLatestState,
  getEquipmentPositionHistory,
  getProductionModelByDay,
  getcalculateEquipmentEarningsByDay,
} from '@/data/get/equipment-utils'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { LatLngExpression, Icon } from 'leaflet'
import { format } from 'date-fns'
import Image from 'next/image'

import caminhao from '../../../../public/caminhao.png'
import garra from '../../../../public/garra.webp'
import harvester from '../../../../public/harvester.png'

const HouseIcon = new Icon({
  iconUrl:
    'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [22, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

interface EquipmentProps {
  params: {
    equipmentId: string
  }
}

const EquipmentPage = ({ params }: EquipmentProps) => {
  const positionHistory = getEquipmentPositionHistory(params.equipmentId)

  return (
    <div className="pt-[100px] min-h-screen flex flex-col items-center">
      <div className="py-5 flex flex-col items-center">
        {getEquipmentModel(params.equipmentId) === 'Harvester' && (
          <Image src={harvester} height={500} width={500} alt="" />
        )}
        {getEquipmentModel(params.equipmentId) === 'Garra traçadora' && (
          <Image src={garra} height={500} width={500} alt="" />
        )}
        {getEquipmentModel(params.equipmentId) === 'Caminhão de carga' && (
          <Image src={caminhao} height={500} width={500} alt="" />
        )}

        <div className=" text-xl">
          <p>Nome: {getEquipmentName(params.equipmentId)}</p>
          <p>Modelo: {getEquipmentModel(params.equipmentId)}</p>
          <p>
            Estado:
            <span
              style={{
                color: getEquipmentLatestState(params.equipmentId)?.color,
                fontWeight: 900,
                marginLeft: 4,
              }}
            >
              {getEquipmentLatestState(params.equipmentId)?.name ||
                'Estado não encontrado'}
            </span>
          </p>
        </div>
      </div>
      <h1 className="text-3xl mb-2">Histórico</h1>
      <MapContainer
        center={
          positionHistory.length > 0
            ? ([
                positionHistory[0].lat,
                positionHistory[0].lon,
              ] as LatLngExpression)
            : [-19.126536, -45.947756]
        }
        zoom={10}
        minZoom={5}
        scrollWheelZoom={true}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution=""
          url={'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'}
        />

        {positionHistory.length > 0 ? (
          positionHistory.map((position, index) => (
            <Marker
              key={index}
              position={[position.lat, position.lon] as LatLngExpression}
              icon={HouseIcon}
            >
              <Popup>
                <div className="text-base font-bold">
                  Data: {format(new Date(position.date), 'dd/MM/yyyy HH:mm:ss')}
                  <p>
                    Produtividade:{' '}
                    {getProductionModelByDay(params.equipmentId, position.date)}
                  </p>
                  <p>
                    {getcalculateEquipmentEarningsByDay(
                      params.equipmentId,
                      position.date,
                    )}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))
        ) : (
          <p>Nenhum posicionamento encontrado para este equipamento.</p>
        )}
      </MapContainer>
    </div>
  )
}

export default EquipmentPage
