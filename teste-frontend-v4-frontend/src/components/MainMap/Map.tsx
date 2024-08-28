import { MapContainer, TileLayer } from 'react-leaflet'
import { IFullEquipment } from '@interfaces/fullEquipment.interface'
import Marker from './Marker'

export type TMarker = { lat: number; lng: number }

interface IMapProps {
  equipments: IFullEquipment[]
  onSeeMoreClick: (id: string) => void
}

const Map = ({ equipments, onSeeMoreClick }: IMapProps) => {
  return (
    <MapContainer
      center={{
        lat: -19.126536,
        lng: -45.947756
      }}
      zoom={11}
      className="h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {equipments.map((equipment) => (
        <Marker
          key={`marker_${equipment.id}`}
          equipment={equipment}
          onSeeMoreClick={onSeeMoreClick}
        />
      ))}
    </MapContainer>
  )
}

export default Map
