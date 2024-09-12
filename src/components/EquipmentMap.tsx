import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import equipmentData from '../../data/equipment.json';
import equipmentPositionHistory from '../../data/equipmentPositionHistory.json';

const EquipmentMap: React.FC = () => {
  const [positions, setPositions] = useState<any[]>([]);

  useEffect(() => {
    const latestPositions = equipmentPositionHistory.map((item: any) => {
      const lastPosition = item.positions[item.positions.length - 1];
      return {
        id: item.equipmentId,
        lat: lastPosition.lat,
        lon: lastPosition.lon,
      };
    });
    setPositions(latestPositions);
  }, []);

  return (
    <MapContainer center={[-19.126536, -45.947756]} zoom={10} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {positions.map((pos: any) => (
        <Marker key={pos.id} position={[pos.lat, pos.lon]}>
          <Popup>
            <div>
              <h3>{equipmentData.find((eq) => eq.id === pos.id)?.name}</h3>
              <p>Estado atual: Operando</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EquipmentMap;
