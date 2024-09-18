import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Equipment, Position } from '../types/interfaces';
import L from 'leaflet'; // Importe a biblioteca leaflet
import Popup from './Popup';

interface MapProps {
  equipments: Equipment[];
  latestPositions?: {
    equipmentId: string;
    latestPosition: Position;
  }[];
}

const Map: React.FC<MapProps> = ({ equipments }) => {
  console.log(equipments);
  const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // URL do ícone
    iconSize: [22, 32], // Tamanho do ícone
    iconAnchor: [12, 41], // Posição do ícone
    popupAnchor: [1, -34], // Posição do popup
  });
  return (
    <MapContainer
      center={[-19.126536, -45.947756]}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {equipments.map(
        ({ equipmentId, latestPosition, latestState, name, modelId }) =>
          latestPosition && (
            <Marker
              key={equipmentId}
              position={[latestPosition.lat, latestPosition.lon]}
              icon={icon}
            >
              <Popup
                state={latestState || null}
                equipmentId={equipmentId}
                name={name}
                modelId={modelId}
              />
            </Marker>
          )
      )}
    </MapContainer>
  );
};

export default Map;
