import React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { getLatestPosition, getLatestState, getEquipmentModel, getMarkerIcon, calculateProductivity, getStateHistory } from '../mapUtils/mapUtils';

const MapDisplay = ({ equipment, stateFilter, modelFilter, selectedEquipment, setSelectedEquipment }) => {
  return (
    <Map
      initialViewState={{ latitude: -19.126536, longitude: -45.947756, zoom: 10 }}
      style={{ width: '850px', height: '500px' }}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=IwLYwEPhmOKKkzY6BYvL"
      onClick={() => setSelectedEquipment(null)}
    >
      {equipment
        .filter(eq => {
          const latestState = getLatestState(eq.id).name;
          const model = getEquipmentModel(eq.equipmentModelId).name;
          return (!stateFilter || stateFilter === latestState) &&
                 (!modelFilter || modelFilter === model);
        })
        .map(eq => (
          <Marker
            key={eq.id}
            latitude={getLatestPosition(eq.id).lat}
            longitude={getLatestPosition(eq.id).lon}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedEquipment(eq);
            }}
          >
            <div style={{ cursor: 'pointer' }}>
              <span style={{ fontSize: '24px' }}>{getMarkerIcon(getLatestState(eq.id).name)}</span>
            </div>
          </Marker>
        ))
      }

      {selectedEquipment && (
        <Popup
          latitude={getLatestPosition(selectedEquipment.id).lat}
          longitude={getLatestPosition(selectedEquipment.id).lon}
          onClose={() => setSelectedEquipment(null)}
          closeOnClick={true}
        >
          <div>
            <h2>{selectedEquipment.name}</h2>
            <p>Modelo: {getEquipmentModel(selectedEquipment.equipmentModelId).name}</p>
            <p>Estado: {getLatestState(selectedEquipment.id).name}</p>
            <p>Última Atualização: {new Date(getLatestPosition(selectedEquipment.id).date).toLocaleString()}</p>
            <p>Produtividade: {calculateProductivity(selectedEquipment.id).toFixed(2)}%</p>
            <h3>Histórico de Estados:</h3>
            <ul>
              {getStateHistory(selectedEquipment.id).map((state, index) => (
                <li key={index}>{state.date} - {state.name}</li>
              ))}
            </ul>
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default MapDisplay;
