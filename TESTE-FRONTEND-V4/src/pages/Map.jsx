import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import EquipmentsLocation from '../components/EquipmentsLocation';
import EquipamentState from '../components/EquipamentState';
import EquipmentsModel from '../components/EquipmentModel';
import Equipment from '../data/equipment.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentState from '../data/equipmentState.json';
import { useEffect, useState } from 'react';

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyD9-vWJSREKOUMMvHjzalbmsHYJrr64WTY',
  });

  const [equipmentsLocal, setEquipmentsLocal] = useState([]);
  const [filteredEquipmentsLocal, setFilteredEquipmentsLocal] = useState([]);
  const [markers, setMarkers] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [equipmentHistory, setEquipmentHistory] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    if (isLoaded) {
      const latestPositions = EquipmentsLocation();
      setEquipmentsLocal(latestPositions);
      setMarkers(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (selectedState) {
      const filtered = equipmentsLocal.filter((equipment) => {
        const latestState = getLatestState(equipment.equipmentId);
        return latestState && latestState.id === selectedState;
      });
      setFilteredEquipmentsLocal(filtered);
    } else {
      setFilteredEquipmentsLocal(equipmentsLocal);
    }
  }, [selectedState, equipmentsLocal]);

  const getLatestState = (equipmentId) => {
    const history = equipmentStateHistory.find(e => e.equipmentId === equipmentId);
    if (!history || !history.states.length) return null;
    const sortedStates = history.states.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    return equipmentState.find(state => state.id === sortedStates.equipmentStateId);
  };

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
    return filteredEquipmentsLocal.map((equip, index) => {
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
                <EquipmentsModel equipmentModelId={equipmentPosition.equipmentModelId} />
                <h4 className="text-lg font-bold">Histórico de estados</h4>
                <ul>
                  {equipmentHistory.map((state, index) => (
                    <li key={index} className="bg-opacity-70 p-2 rounded text-white" style={{ backgroundColor: state.stateColor }}>
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

  const inicialPosition = equipmentsLocal.length > 0 ? { lat: equipmentsLocal[0].lat, lng: equipmentsLocal[0].lng } : { lat: 0, lng: 0 };

  return (
    <main className="relative h-screen">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white p-4 rounded shadow-lg">
        <label htmlFor="stateFilter" className="mr-2">Filtrar por estado:</label>
        <select
          id="stateFilter"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="border rounded p-1"
        >
          <option value="">Todos</option>
          {equipmentState.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={inicialPosition}
          zoom={10}
        >
          {renderMarkers()}
        </GoogleMap>
      ) : (
        <>
          <h1>Carregando...</h1>
          <p>Se o mapa não carregar, verifique sua conexão com a internet.</p>
        </>
      )}
    </main>
  );
}
