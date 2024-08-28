import { useMemo, useRef } from 'react'
import { Marker as RLMarker, Popup } from 'react-leaflet'

import { IFullEquipment } from '@interfaces/fullEquipment.interface'

import useEquipmentIcons from '@hooks/useEquipmentIcons'

interface IMarkerProps {
  equipment: IFullEquipment
  onSeeMoreClick: (id: string) => void
}

const Marker = ({ equipment, onSeeMoreClick }: IMarkerProps) => {
  const markerRef = useRef(null)

  const { EquipmentIcon } = useEquipmentIcons(
    equipment.state,
    equipment.equipmentModel
  )

  const eventHandlers = useMemo(
    () => ({
      mouseover() {
        markerRef.current?.openPopup()
      }
    }),
    []
  )

  return (
    <RLMarker
      ref={markerRef}
      eventHandlers={eventHandlers}
      position={equipment.position}
      icon={EquipmentIcon}
    >
      <Popup>
        <div className="flex flex-col font-normal text-gray-700">
          <header className="flex flex-row justify-between items-center">
            <span className="text-lg font-bold">{equipment.name}</span>
            <span
              className="font-bold"
              style={{ color: equipment.state.color }}
            >
              {equipment.state.name}
            </span>
          </header>
          <span className="font-bold">{equipment.equipmentModel.name}</span>
          <span className="text-xs text-gray-400">ID: {equipment.id}</span>

          <footer className="flex justify-end">
            <span
              className="underline cursor-pointer"
              onClick={() => onSeeMoreClick(equipment.id)}
            >
              ver mais
            </span>
          </footer>
        </div>
      </Popup>
    </RLMarker>
  )
}

export default Marker
