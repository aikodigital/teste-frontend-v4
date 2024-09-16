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

function EquipmentMap() {
  const [positions, setPositions] = useState([]);
  const [equipmentModels, setEquipmentModels] = useState([]);
  const [equipmentState, setEquipmentState] = useState([]);
  const [equipmentStateHistory, setEquipmentStateHistory] = useState ([]);

  useEffect(() => {
    // Buscar dados de posição
    axios.get('/data/equipmentPositionHistory.json')
      .then(response => {
        setPositions(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    // Buscar dados do modelo de equipamento
    axios.get('/data/equipmentModel.json')
      .then(response => {
        setEquipmentModels(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      axios.get('/data/equipmentState.json')
      .then(response => {
        setEquipmentState(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      axios.get('/data/equipmentStateHistory.json')
      .then(response => {
        setEquipmentStateHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []);

  // Função para obter o nome do equipamento pelo ID
  const getEquipmentName = (equipmentId) => {
    const equipment = equipmentModels.find(model => model.id === equipmentId);
    return equipment ? equipment.name : 'Nome do equipamento não adicionado';
  };

  const getEquipmentState = (equipmentId) => {
    const equipment = equipmentState.find(model => model.id === equipmentId);
    return equipment ? equipment.state : 'Estado não adicionado';
  };

  const getEquipmentStateHistory = (equipmentId) => {
    const equipment = equipmentStateHistory.find(model => model.id === equipmentId);
    return equipment ? equipment.equipmentId.states : 'Histórico não atualizado'
  }

  return (

<MapContainer center={[-19.126536, -45.947756]} zoom={13} style={{ height: '500px', width: '100%' }}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {positions.map((equipment) => (
    equipment.positions.map((position, idx) => (
      <Marker key={`${equipment.equipmentId}-${idx}`} position={[position.lat, position.lon]}>
        <Popup>
         <h3> Equipamento ID: {equipment.equipmentId}</h3><br />
         <p>Nome: {getEquipmentName(equipment.equipmentId)}</p>
          <p>Latitude: {position.lat}</p>
          <p>Longitude: {position.lon}</p>
          <p>Estado Atual: {getEquipmentState(equipment.equipmentId.name)}</p> 
          <p>Movimentação do equipamento : {getEquipmentStateHistory(equipment.equipmentId)}</p>
        </Popup>
      </Marker>
    ))
  ))}
</MapContainer>
  );
};

export default EquipmentMap;
