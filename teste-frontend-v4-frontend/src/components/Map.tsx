import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { IFullEquipment } from '../interfaces/fullEquipment.interface'

export type TMarker = { lat: number; lng: number }

interface IMapProps {
  equipments: IFullEquipment[]
}

const Map = ({ equipments }: IMapProps) => {
  return (
    <MapContainer center={equipments[0].position} zoom={11} className="h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {equipments.map(({ id, name, equipmentModel, position }) => (
        <div id={`marker_${id}`}>
          <Marker position={position}>
            <Popup>
              <div className="flex flex-col font-normal text-gray-700">
                <h1 className="text-lg font-bold">{name}</h1>
                <span className="text-xs text-gray-400">ID: {id}</span>
                <span className="">Modelo: {equipmentModel.name}</span>
              </div>
            </Popup>
          </Marker>
        </div>
      ))}
    </MapContainer>
  )
}

export default Map
