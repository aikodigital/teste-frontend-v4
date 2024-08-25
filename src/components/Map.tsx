import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useEquipmentStore from '../store/useEquipmentStore'; 

interface Position {
  lat: number;
  lon: number;
  date: string;
}

const Map: React.FC = () => {
  const { equipment, positions, models, setEquipment, setPositions, setStates, setModels} = useEquipmentStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentResponse = await fetch('/data/equipment.json');
        const equipmentData = await equipmentResponse.json();
        setEquipment(equipmentData);

        const positionsResponse = await fetch('/data/equipmentPositionHistory.json');
        const positionsData = await positionsResponse.json();
        const positionsMap = positionsData.reduce((acc: Record<string, Position[]>, item: { equipmentId: string; positions: Position[] }) => {
          acc[item.equipmentId] = item.positions;
          return acc;
        }, {});
        setPositions(positionsMap);

        const statesResponse = await fetch('/data/equipmentState.json');
        const statesData = await statesResponse.json();
        const stateMap = statesData.reduce((acc: Record<string, string>, state: { id: string, name: string, color: string }) => {
            acc[state.id] = state.name;
            return acc;
        }, {});
        setStates(stateMap);

        const modelsResponse = await fetch('/data/equipmentModel.json');
        const modelsData = await modelsResponse.json();
        console.log(modelsData);
        setModels(modelsData);

      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, [setEquipment, setPositions, setStates, setModels]);

  return (
    <MapContainer center={[-19.126536, -45.947756]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {equipment.map(equip => {
        const pos = positions[equip.id];
        const latestPosition = pos ? pos[pos.length - 1] : null;
        const equipmentModel = models.find(model => model.id === equip.equipmentModelId);

        

        if (!latestPosition || !equipmentModel) {
            console.warn('Missing Position or Model:', latestPosition, equipmentModel);
            return null;
        }
          

        return (
          <Marker
            key={equip.id}
            position={[latestPosition.lat, latestPosition.lon]}
            icon={new L.Icon({
              iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            })}
          >
            <Popup>
              <div>
                <h3>{equipmentModel?.name}</h3>
                
                <p>Última posição:</p>
                <p>Lat: {latestPosition.lat}</p>
                <p>Lon: {latestPosition.lon}</p>
                <p>Data: {new Date(latestPosition.date).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
