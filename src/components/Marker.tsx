import React from 'react';
import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  Position,
  EquipmentState,
  Equipment,
  EquipmentModel,
} from '../types/interface';

interface MarkerComponentProps {
  equip: Equipment;
  position: Position;
  equipmentModel: EquipmentModel;
  equipmentState: EquipmentState | null;
  onClick: () => void;
}

const Marker: React.FC<MarkerComponentProps> = ({
  position,
  equipmentModel,
  equipmentState,
  onClick,
}) => {
  return (
    <LeafletMarker
      position={[position.lat, position.lon]}
      icon={
        new L.Icon({
          iconUrl:
            'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })
      }
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup>
        <div>
          <h3>{equipmentModel?.name}</h3>
          <p>Estado: {equipmentState ? equipmentState.name : 'Desconhecido'}</p>
          <p>Última posição:</p>
          <p>Lat: {position.lat}</p>
          <p>Lon: {position.lon}</p>
        </div>
      </Popup>
    </LeafletMarker>
  );
};

export default Marker;
