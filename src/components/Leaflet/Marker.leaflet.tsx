import React from 'react';
import { Icon } from 'leaflet';
import { Marker } from 'react-leaflet';
import PopupLeaflet from './Popup.leaflet';

function MarkerLeaflet() {
  return (
    <Marker
      position={[51.505, -0.09]}
      icon={
        new Icon({
          iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
          iconUrl: require('leaflet/dist/images/marker-icon.png'),
          shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        })
      }
    >
      <PopupLeaflet />
    </Marker>
  );
}

export default MarkerLeaflet;
