import { Marker, Tooltip } from 'react-leaflet';
import img from '../../assets/marker.png';

import { Icon } from 'leaflet';

interface MarkerProps {
  id: string;
  name: string | undefined;
  model: string | undefined;
  position: [number, number] | undefined;
  state: string | undefined;
}

const DetailedMarker = ({ position, name, model, state }: MarkerProps) => {
  const customIcon = new Icon({
    iconUrl: img,
    iconSize: [24, 24],
  });

  if (!position) return null;

  return (
    <Marker position={position} icon={customIcon} riseOnHover>
      <Tooltip>
        <span>{name}</span>
        <span>{model}</span>
        <span>{state}</span>
      </Tooltip>
    </Marker>
  );
};

export default DetailedMarker;
