import React from 'react';
import { Marker } from 'react-map-gl';

const EquipmentMarker: React.FC<EquipmentMarkerProps> = ({ equipment, onClick }) => {
  if (!isValidCoordinate(equipment.lat, equipment.lon)) {
    return null;
  }

  return (
    <Marker latitude={equipment.lat} longitude={equipment.lon}>
      <div
        onClick={() => onClick(equipment)}
        style={{
          cursor: 'pointer',
          backgroundColor: equipment.state?.color || 'gray',
          borderRadius: '50%',
          width: '10px',
          height: '10px',
        }}
      />
    </Marker>
  );
};
