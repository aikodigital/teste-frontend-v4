import { Marker as LMarker } from 'react-leaflet';
import L, { LatLngExpression, LatLngTuple } from 'leaflet';
import { EquipmentInfo } from './equipment-info';

type ModelName =
  | 'Harvester'
  | 'Caminhão de carga'
  | 'Garra traçadora'
  | 'default';

interface MarkerProps {
  position: LatLngExpression | LatLngTuple;
  equipmentId: string;
  disablePopup?: boolean;
  modelName?: string;
}

const iconsUrl = {
  Harvester: '/pins/harvester.png',
  'Caminhão de carga': '/pins/truck.png',
  'Garra traçadora': '/pins/claw.png',
  default: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
};

function Marker({
  position,
  equipmentId,
  disablePopup,
  modelName = 'default',
}: MarkerProps) {
  const iconUrl = iconsUrl[modelName as ModelName] ?? iconsUrl.default;

  return (
    <LMarker
      position={position}
      icon={
        new L.Icon({
          iconUrl,
          iconSize: modelName !== 'default' ? [41, 41] : [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })
      }
    >
      {!disablePopup && <EquipmentInfo equipmentId={equipmentId} />}
    </LMarker>
  );
}

export { Marker };
