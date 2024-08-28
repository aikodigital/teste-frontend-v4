"use client"
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Position {
  lat: number;
  lon: number;
}

const MapComponent: React.FC<Position> = ({ lat, lon }) => {
  const mapContainerStyle = {
    width: '850px',
    height: '500px'
  };

  const center = {
    lat,
    lng: lon
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyC9B1QpT9g1xIolS7XORsi4erF1xeaa3Ss">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
