import { Marker } from 'react-leaflet';

import img from '../../../assets/marker.png';

import { Icon } from 'leaflet';

const customIcon = new Icon({
  iconUrl: img,
  iconSize: [24, 24],
});

const SelectedMarker = ({ position }: { position: [number, number] }) => {
  if (!position) return null;

  return <Marker position={position} icon={customIcon}></Marker>;
};

export default SelectedMarker;
