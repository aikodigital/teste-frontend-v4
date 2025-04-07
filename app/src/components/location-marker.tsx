import { LatLng } from 'leaflet';
import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import myMarkerUrl from '@/assets/marker.svg';
import { createIcon } from './create-icon';

interface Props {
  setActiveId: (value: string) => void;
}

const LocationMarker: React.FC<Props> = ({ setActiveId }) => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMapEvents({
    dblclick() {
      map.locate();
    },
    click() {
      map.setView([-19.2395, -46.0697], 10);
      setActiveId('');
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    }
  });
  return position ? (
    <Marker position={position} icon={createIcon(myMarkerUrl)}>
      <Popup>Você está aqui</Popup>
    </Marker>
  ) : null;
};
export default LocationMarker;
