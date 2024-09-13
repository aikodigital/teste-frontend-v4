import React from 'react';
//https://www.youtube.com/watch?v=6t73yqu0qOA leaflet lib
import { TileLayer, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // import this on every leaflet usage
import MarkerLeaflet from './Marker.leaflet';

function LeafletMap() {
  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={20}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerLeaflet />
      </MapContainer>
    </div>
  );
}

export default LeafletMap;
