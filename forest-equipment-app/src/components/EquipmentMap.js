import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Configuração manual do ícone para corrigir o caminho da imagem
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const EquipmentMap = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios.get('/data/equipmentPositionHistory.json')
    .then(response => {
      setPositions(response.data); // Armazena os dados de posição
    })
    .catch(error => console.error('Error fetching data:', error));
  
  }, []);

  return (
 

<MapContainer center={[-19.126536, -45.947756]} zoom={13} style={{ height: '500px', width: '100%' }}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {positions.map((equipment) => (
    equipment.positions.map((position, idx) => (
      <Marker key={`${equipment.equipmentId}-${idx}`} position={[position.lat, position.lon]}>
        <Popup>
         <h3> Equipamento ID: {equipment.equipmentId}</h3><br />
          <p>Latitude: {position.lat}</p><br />
          <p>Longitude: {position.lon}</p><br />      
        </Popup>
      </Marker>
    ))
  ))}
</MapContainer>
  );
};

export default EquipmentMap;
