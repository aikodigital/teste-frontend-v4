import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import EquipmentsLocation from '../components/EquipmentsLocation';
import EquipamentState from '../components/EquipamentState';
import Equipment from '../data/equipment.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentState from '../data/equipmentState.json';
import { useEffect, useState } from 'react';
import './Map.css';

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyD9-vWJSREKOUMMvHjzalbmsHYJrr64WTY',
  });

  const [equipmentsLocal, setEquipmentsLocal] = useState([]);
  const [markers, setMarkers] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [equipmentHistory, setEquipmentHistory] = useState([]);

  useEffect(() => {
    if (isLoaded) {
      const latestPosiotions = EquipmentsLocation();
      setEquipmentsLocal(latestPosiotions);
      setMarkers(true);
    }
  }, [isLoaded]);

  const handleClickMarker = (equipment) => {
    if (selectedEquipment && selectedEquipment.id === equipment.id) {
      setSelectedEquipment(null);
      setEquipmentHistory([]);
    } else {
      setSelectedEquipment(equipment);
      const equipmentHistoryData = equipmentStateHistory.find(e => e.equipmentId === equipment.id);
      if (equipmentHistoryData) {
        const history = equipmentHistoryData.states.map(state => {
          const stateData = equipmentState.find(e => e.id === state.equipmentStateId);
          return {
            ...state,
            stateName: stateData ? stateData.name : 'Estado desconhecido',
            stateColor: stateData ? stateData.color : '#000',
          };
        });
        setEquipmentHistory(history);
      } else {
        setEquipmentHistory([]);
      }
    }
  };

  const handleMouseOver = (equipmentId) => {
    setSelectedEquipment(equipmentId);
  };

  const renderMarkers = () => {
    if (!markers) return null;
    return equipmentsLocal.map((equip, index) => {
      const equipmentPosition = Equipment.find(e => e.id === equip.equipmentId);

      if (!equipmentPosition) {
        console.error(`Equipamento com id ${equip.equipmentId} não encontrado`);
        return null;
      }

      return (
        <Marker
          key={index}
          position={{ lat: equip.lat, lng: equip.lng }}
          label={equipmentPosition.name}
          onClick={() => handleClickMarker(equipmentPosition)}
          onMouseOver={() => handleMouseOver(equipmentPosition)}
        >
          {selectedEquipment && selectedEquipment.id === equipmentPosition.id && (
            <InfoWindow
              position={{ lat: equip.lat, lng: equip.lng }}
              onCloseClick={() => setSelectedEquipment(null)}
            >
              <div>
                <h3>{equipmentPosition.name}</h3>
                <EquipamentState equipmentId={selectedEquipment.id} />
                <h4>Histórico de estados</h4>
                <ul>
                  {equipmentHistory.map((state, index) => (
                    <li key={index} style={{ backgroundColor: state.stateColor, padding: '3px', borderRadius: '5px', color: 'white' }}>
                      <strong>{state.stateName}</strong>
                      <p>{new Date(state.date).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </InfoWindow>
          )}
        </Marker>
      );
    });
  };

  const inicialPosition = equipmentsLocal.length > 0 ? { lat: equipmentsLocal[0].lat, lng: equipmentsLocal[0].lng } : { lat: 0, lng: 0 }

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
