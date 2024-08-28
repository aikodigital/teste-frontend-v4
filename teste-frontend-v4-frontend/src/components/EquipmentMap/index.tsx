import { useRef, useState } from 'react'
import { Icon, Map, Point } from 'leaflet'
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet'

// import { EQUIPMENT_STATUS } from '@constants/states'

import { IFullEquipment } from '@interfaces/fullEquipment.interface'
import { TPosition } from '@interfaces/equipmentPositionHistory.interface'

import createMapLines from '@services/createMapLines'

// import iconMaintaining from '@assets/iconMaintaining.svg'
import iconWorking from '@assets/iconWorking.svg'
// import iconStopped from '@assets/iconStopped.svg'

export type TMarker = { lat: number; lng: number }

interface IMapProps {
  equipment: IFullEquipment
  positions: TPosition[]
}

const EquipmentMap = ({ positions }: IMapProps) => {
  const mapRef = useRef<Map>(null)

  const [positionIndex, setPositionIndex] = useState(0)

  // const MaintainingIcon = new Icon({
  //   iconUrl: iconMaintaining,
  //   iconSize: new Point(24, 24)
  // })
  const WorkingIcon = new Icon({
    iconUrl: iconWorking,
    iconSize: new Point(24, 24)
  })
  // const StoppedIcon = new Icon({
  //   iconUrl: iconStopped,
  //   iconSize: new Point(24, 24)
  // })

  const multiPolyline = createMapLines(positions)

  const handleLastMarker = () => {
    if (positionIndex + 1 < positions.length) {
      const newPos = positions[positionIndex + 1]
      mapRef.current?.setView({ lat: newPos.lat, lng: newPos.lon }, 15, {
        animate: true,
        duration: 2
      })

      setPositionIndex((i) => {
        return i + 1
      })
    }
  }

  const handleNextMarker = () => {
    if (positionIndex - 1 >= 0) {
      const newPos = positions[positionIndex - 1]
      mapRef.current?.setView({ lat: newPos.lat, lng: newPos.lon }, 15, {
        animate: true,
        duration: 2
      })
      setPositionIndex((i) => {
        return i - 1
      })
    }
  }

  const handleFirstMarker = () => {
    const newPos = positions[positions.length - 1]
    mapRef.current?.setView({ lat: newPos.lat, lng: newPos.lon }, 15, {
      animate: true,
      duration: 2
    })
    setPositionIndex(positions.length - 1)
  }

  const handleResetMarker = () => {
    const newPos = positions[0]
    mapRef.current?.setView({ lat: newPos.lat, lng: newPos.lon }, 15, {
      animate: true,
      duration: 2
    })
    setPositionIndex(0)
  }

  return (
    <>
      <div className="mb-2 p-4 bg-white rounded-lg shadow-md select-none">
        <h1 className="text-lg font-bold"> Posição do equipamento</h1>
        <div className="flex flex-row gap-4">
          <span
            className="cursor-pointer hover:underline"
            onClick={handleFirstMarker}
          >
            primeiro registro
          </span>
          <span
            className="cursor-pointer hover:underline"
            onClick={handleLastMarker}
          >
            anterior
          </span>
          <span>
            {new Date(positions[positionIndex].date).toLocaleString()}
          </span>
          <span
            className="cursor-pointer hover:underline"
            onClick={handleNextMarker}
          >
            proximo
          </span>
          <span
            className="cursor-pointer hover:underline"
            onClick={handleResetMarker}
          >
            ultima registrada
          </span>
        </div>
      </div>

      <div>
        <MapContainer
          ref={mapRef}
          center={{ lat: positions[0].lat, lng: positions[0].lon }}
          zoom={15}
          className="h-[400px]"
        >
          <Polyline
            pathOptions={{ color: '#9ca3af', weight: 0.8 }}
            positions={multiPolyline}
          />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {positions.map(({ lat, lon }, i) => (
            <div key={`marker_${i}`}>
              <Marker
                position={{ lat: lat, lng: lon }}
                icon={WorkingIcon}
                // icon={
                //   state.id === EQUIPMENT_STATUS.MAINTAINING
                //     ? MaintainingIcon
                //     : state.id === EQUIPMENT_STATUS.WORKING
                //     ? WorkingIcon
                //     : StoppedIcon
                // }
              ></Marker>
            </div>
          ))}
        </MapContainer>
      </div>
    </>
  )
}

export default EquipmentMap
