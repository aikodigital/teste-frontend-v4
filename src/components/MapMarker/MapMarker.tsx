import React from "react";
import dynamic from 'next/dynamic';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Tooltip } from 'react-leaflet';
import { Equipment } from '../../types/equipment';
import { getMarkerShape } from '../../utils/marker.utils';

const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

interface HoverableMarkerProps {
  position: [number, number];
  equipment: Equipment;
  onClick: (equipment: Equipment) => void;
}

const HoverableMarker: React.FC<HoverableMarkerProps> = ({
  position,
  equipment,
  onClick,
}) => {

  const handleClick = () => {
    onClick(equipment);
  };

  return (
    <Marker
      position={position}
      icon={L.divIcon({
        className: 'custom-marker',
        html: getMarkerShape(equipment.stateColor, equipment.model) as string,
      })}
      eventHandlers={{
        click: handleClick,
      }}
    >
      <Tooltip>
        <div>
          <h3>{equipment.name}</h3>
          <p>Model: {equipment.model}</p>
          <p>State: {equipment.state}</p>
          <p>Position: ({equipment.position.lat}, {equipment.position.lon})</p>
        </div>
      </Tooltip>
    </Marker>
  );
};

export default HoverableMarker;