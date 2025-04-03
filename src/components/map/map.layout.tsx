import { MapContainer, TileLayer } from 'react-leaflet';
import { MapWrapper } from './map.styles';
import { MapMarkers } from '../marker/marker.layout';

const Map = () => {
  return (
    <MapWrapper>
      <MapContainer
        center={[-19, -46]}
        zoom={12}
        scrollWheelZoom={true}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <MapMarkers />
      </MapContainer>
    </MapWrapper>
  );
};

export default Map;
