'use client'

// eslint-disable-next-line import-helpers/order-imports
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import * as S from './styled'

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src
})

interface MapProps {
  locationInfo: {
    location: {
      lat: number
      lon: number
    }
    nameEquipment: string
  }[]
}

export default function AllEquipmentsMap({ locationInfo }: MapProps) {
  const getMarkerIcon = (nameEquipment: string) => {
    if (nameEquipment[0].includes('CA')) {
      return new L.Icon({
        iconUrl: '/images/truck-trailer-fill.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: markerShadow.src,
        shadowSize: [41, 41]
      })
    } else if (nameEquipment[0].includes('HV')) {
      return new L.Icon({
        iconUrl: '/images/tractor-fill.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: markerShadow.src,
        shadowSize: [41, 41]
      })
    } else {
      return new L.Icon({
        iconUrl: '/images/grains-fill.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: markerShadow.src,
        shadowSize: [41, 41]
      })
    }
  }

  return (
    <S.Container>
      <MapContainer
        scrollWheelZoom={true}
        center={[-19.151801, -46.007759]}
        zoom={11}
        style={{ height: '100vh', width: '100vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locationInfo.map((position, index) => (
          <Marker
            key={index}
            position={[position.location.lat, position.location.lon]}
            icon={getMarkerIcon(position.nameEquipment)}
          >
            <Popup>{position.nameEquipment}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </S.Container>
  )
}
