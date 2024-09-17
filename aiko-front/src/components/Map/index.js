import React from 'react';
import './index.css';


import moment from 'moment';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import positions from '../../data/equipmentPositionHistory.json';
import equipments from '../../data/equipment.json';
import states from '../../data/equipmentState.json';
import equipmentStatesHistory from '../../data/equipmentStateHistory.json';

export function Layout() {
  const Icon = L.icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -40]
  });
  
  function getLattestEquipLocation(equipmentPosition) {
    const { positions } = equipmentPosition;
    
    const lastDate = moment.max(positions.map(pos => moment(pos.date)));
    return positions.find(pos => pos.date === lastDate._i);
  }

  function getEquipmentCurrentState(equipPos) {
    const equipment = equipments.find(equip => equip.id === equipPos.equipmentId);
    
    const equipmentState = equipmentStatesHistory.find(sts => sts.equipmentId === equipment.id);
    const currentState = moment.max(equipmentState.states.map(sts => moment(sts.date)));
    
    return states
      .find(sts => sts.id === equipmentState.states
      .find(sts => sts.date === currentState._i).equipmentStateId).name
  }

  function getEquipmentStateHistory(equipPos) {
    const equip = equipmentStatesHistory.find(his => his.equipmentId === equipPos.equipmentId);
    return equip.states;
  }

  return (
    <div 
      className='wrapper'
    >
      <MapContainer  
        center={{ 
          lat: positions[0].positions[0].lat, 
          lng: positions[0].positions[0].lon
        }}
        zoom={11}
        style={{ height: "600px", width: "800px" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          positions.map((equipPos, index) => (
            <Marker 
              key={index} 
              position={[
                getLattestEquipLocation(equipPos).lat, 
                getLattestEquipLocation(equipPos).lon
              ]}
              icon={Icon}
              title={getEquipmentCurrentState(equipPos)}
            >
              <Popup className='popup-wrapper'>{
                getEquipmentStateHistory(equipPos)
                .reverse()
                .map((hsts) => (
                  <>
                    <p>
                      {moment(hsts.date).format("DD/MM/YY")} 
                        - 
                      {states.find(sts => sts.id === hsts.equipmentStateId).name}
                    </p>
                  </>
                ))}</Popup>
            </Marker>
            ))
        }
      </MapContainer>
      </div>
  )
}
