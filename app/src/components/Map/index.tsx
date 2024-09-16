"use client"

import React from 'react';
import { MapContainer, MapContainerProps, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

interface Props extends MapContainerProps {
  children?: React.ReactNode
}

export function _Map({ children, ...props }: Props) {
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
          zoom={12}
          {...props}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            className='!w-full !h-full'
          />
          {children}
        </MapContainer>
      </div >
    </>
  )
}

export const Map = dynamic(() => Promise.resolve(_Map), {
  ssr: false,
})
