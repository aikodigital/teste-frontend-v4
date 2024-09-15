import React from "react"
import { Marker as MarkerRL } from "react-leaflet"
import L from 'leaflet'
import { Coords } from "@/helpers/types"

const icon = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [22, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

interface Props extends React.PropsWithChildren {
  coords: Coords
}

export function Marker({ coords, children }: Props) {
  return (
    <MarkerRL
      position={coords}
      icon={icon}
      eventHandlers={{
        mouseover: (event) => event?.target?.openPopup(),
      }}
    >
      {children}
    </MarkerRL>
  )
}