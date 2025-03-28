/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { useEquipmentState } from './../utils/useEquipmentState';
import { calculateProductivity, calculateGain } from '../utils/utils';
import { GoogleMap, Polyline } from '@react-google-maps/api';
import HistoryPositions from '../components/historyPositions';
import "../styles/maps.css";

const infoMapStyle = {
  width: '100%',
  height: '300px',
};


const Map: React.FC<any> = ({ selectedEquipment }) => {
  const { selectedDate } = useEquipmentState();

  return (
    <div className='maps'>
      <h3>{selectedEquipment.name} ({selectedEquipment.model})</h3>
      <p><strong>Percentual de Produtividade:</strong> {calculateProductivity(selectedEquipment, selectedDate).productivity.toFixed(2)}%</p>
      <p><strong>Horas Trabalhadas:</strong> {calculateProductivity(selectedEquipment, selectedDate).hoursWorked.toFixed(2)} horas</p>
      <p><strong>Ganho Estimado:</strong> R$ {calculateGain(selectedEquipment, selectedDate).totalGain.toFixed(2)}</p>
      <p style={{ color: selectedEquipment.lastState.color }}>
        <strong>Estado Atual:</strong> {selectedEquipment.lastState.name}
      </p>

      <h5>Trajeto no Mapa:</h5>
      {selectedEquipment.lastPosition && (
        <div className="google-map">
          <GoogleMap mapContainerStyle={infoMapStyle} center={{ lat: selectedEquipment.lastPosition.lat, lng: selectedEquipment.lastPosition.lon }} zoom={10}>
          <Polyline
              path={selectedEquipment.positionHistory.flatMap((position: any) =>
                position.positions.map((pos: any) => ({
                  lat: pos.lat,
                  lng: pos.lon
                }))
              )}
              options={{ strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 2 }}
            />
          </GoogleMap>
        </div>
      )}

      <div className="history-container">
        <HistoryPositions selectedEquipment={selectedEquipment} />
      </div>
    </div>
  );
};

export default Map;
