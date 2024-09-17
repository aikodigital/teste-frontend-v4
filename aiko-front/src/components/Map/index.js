import React from 'react';
import "./index.css";

import moment from "moment";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import positions from '../../data/equipmentPositionHistory.json';
import equipments from '../../data/equipment.json';
import states from '../../data/equipmentState.json';
import histories from '../../data/equipmentPositionHistory.json';
import equipmentStatesHistory from '../../data/equipmentStateHistory.json';

function getLattestEquipLocation(equipmentPosition) {
  const { positions } = equipmentPosition;
  
  const lastDate = moment.max(positions.map(pos => moment(pos.date)));
  return positions.find(pos => pos.date === lastDate._i);
}

function getEquipmentTitle(equipPos) {
  return equipments.find(equip => equip.id === equipPos.equipmentId).name;
}

function getEquipmentCurrentState(equipPos) {
  const equipment = equipments.find(equip => equip.id === equipPos.equipmentId);
  
  const equipmentStates = equipmentStatesHistory.find(sts => sts.equipmentId === equipment.id);
  const currentState = moment.max(equipmentStates.states.map(sts => moment(sts.date)));
  
 console.log(equipmentStatesHistory.find(his => his.states.date === currentState._i));
}

/* function getEquipmentHistory(equipPos) {
  const history = histories.find(his => his.equipmentId === equipPos.equipmentId);

  console.log(history);
} */

export function Layout() {
  const Icon = L.icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -40]
  });

  return (
    <div 
      className='wrapper'
    >
      <MapContainer  
        center={{ lat: positions[0].positions[0].lat, lng: positions[0].positions[0].lon }}
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
                title={getEquipmentTitle(equipPos)}
              >
                <Popup>{getEquipmentCurrentState(equipPos)}</Popup>
              </Marker>
            ))
        }
      </MapContainer>
      </div>
  )
}
