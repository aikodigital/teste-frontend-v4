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
  handleClick: () => void
}

export function Marker({ coords, handleClick, children }: Props) {
  return (
    <MarkerRL
      title="Clique para ver o histórico de estados"
      position={coords}
      icon={icon}
      eventHandlers={{
        click: handleClick,
        mouseover: (event) => event?.target?.openPopup(),
      }}
    >
      {children}
    </MarkerRL>
  )
}