import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// Definir o container do mapa (card)
const containerStyle = {
  width: '400px',
  height: '300px',
};

// Definir a posição inicial do mapa (pode ser ajustada de acordo com os dados reais)
const center = {
  lat: -19.126536,
  lng: -45.947756,
};

const MapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'SUA_CHAVE_DE_API', // Coloque sua chave de API do Google Maps aqui
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {/* Marcador representando a posição do equipamento */}
      <Marker position={center} />
    </GoogleMap>
  ) : <div>Carregando Mapa...</div>
}

export default React.memo(MapComponent);
