import { Marker as LMarker } from 'react-leaflet';
import L, { LatLngExpression, LatLngTuple } from 'leaflet';
import { EquipmentInfo } from './equipment-info';

interface MarkerProps {
  position: LatLngExpression | LatLngTuple;
  equipmentId: string;
}

function Marker({ position, equipmentId }: MarkerProps) {
  return (
    <LMarker
      position={position}
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
    >
      <EquipmentInfo equipmentId={equipmentId} />
    </LMarker>
  );
}

export { Marker };
