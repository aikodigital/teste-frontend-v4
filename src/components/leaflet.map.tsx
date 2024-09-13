import React from 'react';
import { Icon } from 'leaflet';
//https://www.youtube.com/watch?v=6t73yqu0qOA leaflet lib
import { TileLayer, MapContainer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // import this on every leaflet usage

function LeafletMap() {
  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={20}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
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
          <Popup>
            {/* <img
              src={
                'https://br.web.img3.acsta.net/medias/nmedia/18/96/03/40/20440821.jpg'
              }
              width={'20px'}
              height={'20px'}
              alt="Popup Image"
            /> */}
            Sou interativo
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LeafletMap;
