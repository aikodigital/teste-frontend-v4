import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import './Map.css';

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD9-vWJSREKOUMMvHjzalbmsHYJrr64WTY",
  });

  const position = { lat: -15.833032, lng: -47.828117 };

  return (
    <main className='map'>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={position}
          zoom={10}
        >
          <Marker position={position} />
        </GoogleMap>
      ) : <>
        <h1>Carregando...</h1>
        <p>Se o mapa não carregar, verifique sua conexão com a internet.</p>
      </>
      }
    </main>
  )
}
