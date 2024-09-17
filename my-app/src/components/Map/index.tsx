'use client';

import L from 'leaflet';
import MarkerIcon from 'leaflet/dist/images/marker-icon.png';
import MarkerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import styles from './Map.module.css';
import { Coordinates } from '@/app/map/[id]/page';

const Map = ({ lat, lon }: Coordinates) => {

  const coord = [lat, lon];

  return (
    <div className={styles.leafletContainer}>
      <MapContainer
        className={styles.mapContainer}
        center={[coord[0], coord[1]]}
        zoom={9}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={
            new L.Icon({
              iconUrl: MarkerIcon.src,
              iconRetinaUrl: MarkerIcon.src,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, -41],
              shadowUrl: MarkerShadow.src,
              shadowSize: [41, 41],
            })
          }
          position={[lat, lon]}
        >
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;