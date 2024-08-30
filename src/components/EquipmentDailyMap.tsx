import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

interface Position {
  date: string
  lat: number
  lon: number
}

interface EquipmentDailyMapProps {
  positions: Position[]
  equipmentModelId: string
}

const EquipmentDailyMap: React.FC<EquipmentDailyMapProps> = ({
  positions,
  equipmentModelId,
}) => {
  if (positions.length === 0) {
    return <div>No position data available for this day.</div>
  }

  const polyline = positions.map(
    (pos) => [pos.lat, pos.lon] as [number, number],
  )
  const center = polyline[Math.floor(polyline.length / 2)]

  const getCustomIcon = (modelId: string) => {
    let iconUrl = ''
    switch (modelId) {
      case 'a3540227-2f0e-4362-9517-92f41dabbfdf':
        iconUrl = '/img/caminhaoDeCarga.png'
        break
      case 'a4b0c114-acd8-4151-9449-7d12ab9bf40f':
        iconUrl = '/img/harvester.png'
        break
      case '9c3d009e-0d42-4a6e-9036-193e9bca3199':
        iconUrl = '/img/garraTracadora.png'
        break
      default:
        iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
    }

    return L.divIcon({
      className: 'custom-icon',
      html: `
      <div style="
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #003380;
        overflow: hidden;
        background: white;
      ">
        <img src="${iconUrl}" style="
          width: 100%;
          height: 100%;
          object-fit: cover;
        "/>
        <div style="
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 10px;
          background: #003380;
          border-radius: 50%;
        " />
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 50],
      popupAnchor: [0, -20],
    })
  }

  return (
    <MapContainer
      zoom={10}
      center={center}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline positions={polyline} color="blue" />
      {positions.map((pos, index) => (
        <Marker
          key={index}
          position={[pos.lat, pos.lon]}
          icon={getCustomIcon(equipmentModelId)}
        >
          <Popup>
            Horário{' '}
            {new Date(pos.date).toLocaleTimeString('pt-BR', {
              timeZone: 'America/Sao_Paulo',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default EquipmentDailyMap
