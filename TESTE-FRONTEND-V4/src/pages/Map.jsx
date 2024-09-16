import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import EquipmentsLocation from '../components/EquipmentsLocation';
import equipment from '../data/equipment.json';
import { useEffect, useState } from 'react';
import './Map.css';

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyD9-vWJSREKOUMMvHjzalbmsHYJrr64WTY',
  });

  const [equipmentsLocal, setEquipmentsLocal] = useState([]);
  const [markers, setMarkers] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const latestPosiotions = EquipmentsLocation();
      setEquipmentsLocal(latestPosiotions);
      setMarkers(true);
    }
  }, [isLoaded]);

  const renderMarkers = () => {
    if (!markers) return null;
    return equipmentsLocal.map((equip, index) => {
      const equipmentPosition = equipment.find(e => e.id === equip.equipmentId);

      if (!equipmentPosition) {
        console.error(`Equipamento com id ${equip.equipmentId} não encontrado`);
        return null;
      }

      return (
        <Marker
          key={index}
          position={{ lat: equip.lat, lng: equip.lng }}
          label={equipmentPosition.name}
        />
      );
    });
  };

  const inicialPosition = equipmentsLocal. length > 0 ? { lat: equipmentsLocal[0].lat, lng: equipmentsLocal[0].lng } : { lat: 0, lng: 0 }

  return (
    <main className='map'>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={inicialPosition}
          zoom={10}
        >
          {renderMarkers()}
        </GoogleMap>
      ) : <>
        <h1>Carregando...</h1>
        <p>Se o mapa não carregar, verifique sua conexão com a internet.</p>
      </>
      }
    </main>
  )
}
