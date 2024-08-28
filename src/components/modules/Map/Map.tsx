import React from 'react';
import { GoogleMap, LoadScript, GoogleMapProps } from '@react-google-maps/api';

import './Map.scss'

// Definindo o tipo das propriedades do componente
interface MapProps {}

const containerStyle: React.CSSProperties = {
  width: '70%',
  height: '500px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map: React.FC<MapProps> = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.warn('API key is missing.')
    return null;
  }

  return (
    <div className='map-container'>
      <LoadScript
        googleMapsApiKey={apiKey}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          key={apiKey}
        >
          { /* Adicione seus marcadores ou outros componentes do mapa aqui */ }
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;