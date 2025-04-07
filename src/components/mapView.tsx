import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface MapViewProps {
  lat: number;
  lon: number;
  color?: string;
}

const containerStyle = {
  width: '100%',
  height: '60vh',
};

const MapView = ({ lat, lon }: MapViewProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const center = {
    lat,
    lng: lon,
  };

  if (!isLoaded) return <div>Carregando mapa...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default MapView;
