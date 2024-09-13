import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Equipment {
    id: string;
    name: string;
    lat: number;
    lon: number;
    state: string;
    color: string;
  }

interface MapProps {
  equipmentList: Equipment[];
}

const Map = ({ equipmentList }: MapProps) => {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {equipmentList.map((equipment) => (
        <Marker
          key={equipment.id}
          position={[equipment.lat, equipment.lon]}
          icon={L.divIcon({
            className: 'custom-icon',
            html: `<div style="background-color: ${equipment.color}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
          })}
        >
          <Popup>
            <strong>{equipment.name}</strong><br />
            Estado: {equipment.state}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
