import React from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import './Map.css';



const MapComponent = () => {

  const position = {lat: 53.54992, lng: 10.00678};

  return (
    <div className='map-container'>
       <APIProvider apiKey={process.env.REACT_APP_MAP_KEY || ''}>
      <Map defaultCenter={position} defaultZoom={10}>
        <Marker position={position} />
      </Map>
    </APIProvider>
    </div>
   
  );
}



export default MapComponent;
