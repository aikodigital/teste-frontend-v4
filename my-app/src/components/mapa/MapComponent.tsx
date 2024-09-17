"use client"

import { useEffect } from 'react';
import { useEquipmentStore } from '../../store/useEquipmentStore';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -19.126536,
  lng: -45.947756,
};

const MapComponent = () => {
  const { equipmentPositions, fetchEquipmentPositions } = useEquipmentStore();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    fetchEquipmentPositions();
  }, [fetchEquipmentPositions]);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {equipmentPositions.map((position, index) => (
        <Marker key={index} position={{ lat: position.lat, lng: position.lng }} />
      ))}
    </GoogleMap>
  ) : (
    <div>Carregando Mapa...</div>
  );
};

export default MapComponent;
