import { MapContainer, TileLayer } from 'react-leaflet';

import { useDataContext } from '../../context/DataContext';
import Marker from '../Marker/Marker';
import Drawer from '../Drawer/Drawer';

import 'leaflet/dist/leaflet.css';
import './index.css';

const Map = () => {
  const { data } = useDataContext();

  return (
    <>
      <MapContainer center={[-19.126536, -45.947756]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {data.map((marker) => (
          <Marker key={marker.id} {...marker} />
        ))}
      </MapContainer>

      <Drawer />
    </>
  );
};

export default Map;
