import React from "react"
import { Popup } from "react-leaflet"

interface Props {
  name: string
  stateName?: string
  stateColor?: string
}

export function MarkerPopup(props: Props) {
  const { name, stateColor, stateName } = props

  return (
    <Popup>
      <div className="rounded-md overflow-hidden flex items-center h-8">
        <span className="h-full w-5" style={{ backgroundColor: stateColor }} />
        <p className="pl-3 pr-5">{name} ({stateName})</p>
      </div>
    </Popup>
  )
}