"use client"

import React, { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const icon = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [22, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const RecenterAutomatically = ({ coords }: { coords: Coords | null }) => {
  const map = useMap();
  useEffect(() => {
    if (!coords?.lat) {
      map.setView({ lat: -22.637081990512296, lng: -54.823245482408126 })
      return;
    }
    map.setView({ lat: coords.lat, lng: coords.lng })
  }, [map, coords?.lat, coords?.lng])
  return null;
}

interface Coords {
  lat: number
  lng: number
}

interface Props {
  coords: Coords
}

export function _Map(props: Props) {
  const { coords } = props

  if (typeof window === 'undefined') return null

  return (
    <>
      <div
        id='map'
        className='w-full h-full shrink-0 rounded-md bg-gray-300 shadow-md'
      >
        <MapContainer
          style={{ flex: 1, width: '100%', height: 'calc(100vh - 65px)' }}
          center={{ lat: -22.637081990512296, lng: -54.823245482408126 }}
          zoom={14}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            className='!w-full !h-full'
          />
          {coords?.lat && (
            <Marker position={coords} icon={icon} />
          )}
          <RecenterAutomatically coords={coords} />
        </MapContainer>
      </div>
    </>
  )
}

export const Map = dynamic(() => Promise.resolve(_Map), {
  ssr: false,
})
