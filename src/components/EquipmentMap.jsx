import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { formatCurrencyBRL } from '../utils/mapUtils';

const EquipmentMap = ({ filteredData, getIcon, calculateProductivity, calculateGain, setSelectedEquipment, selectedEquipmentPositions }) => (
  <MapContainer id="map_container" center={[-19.300, -45.8000]} zoom={9}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {filteredData.map(equipment => (
      equipment.lat && equipment.lon && (
        <Marker
          key={equipment.id}
          position={[equipment.lat, equipment.lon]}
          icon={getIcon(equipment.model, equipment.state ? equipment.state.name : 'Desconhecido')}
          eventHandlers={{
            click: () => setSelectedEquipment({
              ...equipment,
              modelName: equipment.model ? equipment.model.name : 'Modelo Desconhecido'
            }),
          }}
        >
          <Popup>
            <div>
              <h3>{equipment.model ? equipment.model.name : 'Modelo Desconhecido'} - {equipment.name ? equipment.name : 'Equipamento Desconhecido'}</h3>
              <p>Status Atual: {equipment.state ? equipment.state.name : 'Desconhecido'}</p>
              <p>Produtividade: {calculateProductivity(equipment.stateHistory)}%</p>
              <p>Ganho Estimado: {formatCurrencyBRL(calculateGain(equipment, equipment.stateHistory.length))}</p>
            </div>
          </Popup>
        </Marker>
      )
    ))}

    {selectedEquipmentPositions.length > 0 && (
      <Polyline
        positions={selectedEquipmentPositions.map(pos => [pos.lat, pos.lon])}
        color="blue"
        weight={5}
      />
    )}
  </MapContainer>
);

export default EquipmentMap;
