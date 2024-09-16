import { formatMoney } from "@/helpers/formatters"
import React from "react"
import { Popup } from "react-leaflet"

interface Props {
  name: string
  stateName?: string
  stateColor?: string
  productivityPercentage: string
  equipmentGain: number
}

export function MarkerPopup(props: Props) {
  const { name, stateColor, stateName, productivityPercentage, equipmentGain } = props

  const details = [
    { label: 'Estado atual', value: stateName },
    { label: 'Produtividade', value: `${productivityPercentage}%` },
    { label: 'Ganho', value: formatMoney(equipmentGain) },
  ]

  return (
    <Popup>
      <div className="rounded-md overflow-hidden flex items-center h-24">
        <i className="h-full w-5" style={{ backgroundColor: stateColor }} />
        <div className="flex flex-col justify-center pl-3 pr-5">
          <h1 className="font-semibold text-base">{name}</h1>
          {details.map(item => (
            <p className="!m-0 !text-sm" key={item.label}>{item.label}: {item.value}</p>
          ))}
        </div>
      </div>
    </Popup>
  )
}