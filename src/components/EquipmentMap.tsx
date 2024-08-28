import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { selectEquipment } from '../store/mapSlice';
import EquipmentPopup from './EquipmentPopup';

const EquipmentMap: React.FC = () => {
  const equipmentPositions = useSelector((state: RootState) => state.equipment.equipmentPositionHistory);
  const dispatch = useDispatch();

  const handleMarkerClick = (equipmentId: string) => {
    dispatch(selectEquipment(equipmentId));
  };

  return (
    <MapContainer 
      center={[-19.126536, -45.947756]} 
      zoom={13} 
      style={{ height: 'calc(100vh - 64px)', width: '100%' }}  // Ajuste de altura considerando o header
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {equipmentPositions.map((equipment) => (
        <Marker
          key={equipment.equipmentId}
          position={[equipment.positions[0].lat, equipment.positions[0].lon]}
          eventHandlers={{
            click: () => handleMarkerClick(equipment.equipmentId),
          }}
        >
          <Popup>
            <EquipmentPopup equipmentId={equipment.equipmentId} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default EquipmentMap;
