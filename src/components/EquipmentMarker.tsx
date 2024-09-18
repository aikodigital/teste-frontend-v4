import React from 'react';
import { Marker, Popup } from 'react-leaflet';

interface EquipmentMarkerProps {
  equipment: any;
  lastState: any;
  equipmentModel: string;
  icon: any;
  handleMarkerClick: (equipmentId: string) => void; 
}

const EquipmentMarker: React.FC<EquipmentMarkerProps> = ({
  equipment,
  lastState,
  equipmentModel,
  icon,
  handleMarkerClick, 
}) => {
  const lastPosition = equipment.positions[equipment.positions.length - 1]; 

  return (
    <Marker
      position={[lastPosition.lat, lastPosition.lon]}
      icon={icon}
      eventHandlers={{
        mouseover: (e) => {
          e.target.openPopup();
        },
        mouseout: (e) => {
          e.target.closePopup(); 
        },
        click: () => {
          handleMarkerClick(equipment.equipmentId); 
        },
      }}
    >
      <Popup closeButton={false}>
        Equipamento ID: {equipment.equipmentId} <br />
        Modelo: {equipmentModel} <br />
        Estado: {lastState.name}
      </Popup>
    </Marker>
  );
};

export default EquipmentMarker;
