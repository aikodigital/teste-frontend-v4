'use client'

// eslint-disable-next-line import-helpers/order-imports
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import React from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'

import * as S from './styled'

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src
})

interface Position {
  lat: number
  lon: number
  date: string
}

interface MapProps {
  local: {
    lat: number
    lon: number
  }
  positions: Position[]
}

const routeMarkerIcon = new L.Icon({
  iconUrl: '/images/map-pin-fill.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadow.src,
  shadowSize: [41, 41]
})

export default function Map({ local, positions }: MapProps) {
  const polylinePositions: [number, number][] = positions.map(position => [
    position.lat,
    position.lon
  ])

  return (
    <S.Container>
      <MapContainer
        scrollWheelZoom={true}
        center={[local.lat, local.lon]}
        zoom={16}
        style={{ height: '100vh', width: '100vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={polylinePositions} color="#B3B2B8" />

        {positions.map((position, index) => (
          <Marker
            key={index}
            position={[position.lat, position.lon]}
            icon={routeMarkerIcon}
          >
            <Popup>{new Date(position.date).toLocaleDateString()}</Popup>
          </Marker>
        ))}
        <S.ActivePosition>
          <Marker position={[local.lat, local.lon]}></Marker>
        </S.ActivePosition>
      </MapContainer>
    </S.Container>
  )
}
