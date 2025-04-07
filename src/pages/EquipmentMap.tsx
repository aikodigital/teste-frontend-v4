import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import equipmentData from '../data/equipment.json';
import equipmentModelData from '../data/equipmentModel.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import equipmentPositionHistoryData from '../data/equipmentPositionHistory.json';
import 'leaflet/dist/leaflet.css';
import caminhaoIconUrl from '../assets/icons/caminhao.png';
import harvesterIconUrl from '../assets/icons/harvester.png';
import garraIconUrl from '../assets/icons/garra-traçadora.png';
import Working from '../assets/statesImages/working.png';
import Stopped from '../assets/statesImages/stopped.png';
import Maintenance from '../assets/statesImages/maintenance.png';

interface MarkerData {
  id: string;
  position: [number, number];
  name: string;
  model: string;
  state: { name: string; color: string } | null
}

export function EquipmentMap() {
  const [search, setSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [mapMarkers, setMapMarkers] = useState<MarkerData[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<
    { id: string; name: string; equipmentModelId: string }[]
  >(equipmentData);

  const getIcon = (
    name: 'Caminhão de carga' | 'Harvester' | 'Garra traçadora',
    state: string
  ) => {
    const imageIcon = new L.Icon({
      iconUrl:
        name == 'Caminhão de carga' ? caminhaoIconUrl :
        name == 'Harvester' ? harvesterIconUrl :
        name == 'Garra traçadora' ? garraIconUrl : '',
      iconSize: [50, 50],
      iconAnchor: [50, 50],
      popupAnchor: [-25, -50],
      shadowUrl:
        state == 'Operando' ? Working :
        state == 'Parado' ? Stopped :
        state == 'Manutenção' ? Maintenance : '',
      shadowSize: [16, 16],
      shadowAnchor: [0, 35],
    });
    return imageIcon;
  }

  const getLatestPosition = (equipmentId: string) => {
    const positionHistory = equipmentPositionHistoryData.find(
      (history) => history.equipmentId === equipmentId
    );
    if (!positionHistory || positionHistory.positions.length === 0) return null;
    return positionHistory.positions[positionHistory.positions.length - 1];
  };

  const getLatestState = (equipmentId: string) => {
    const history = equipmentStateHistoryData.find((h) => h.equipmentId === equipmentId);
    if (!history || history.states.length === 0) return null;

    const latestStateId = history.states[history.states.length - 1].equipmentStateId;
    return equipmentStateData.find((state) => state.id === latestStateId) || null;
  };

  useEffect(() => {
    let filtered = equipmentData.filter((equipment) => {
      const matchesSearch = equipment.name.toLowerCase().includes(search.toLowerCase());
      const matchesModel = !selectedModel || equipment.equipmentModelId === selectedModel;
      const currentState = getLatestState(equipment.id);
      const matchesState = !selectedState || (currentState && currentState.id === selectedState);
  
      return matchesSearch && matchesModel && matchesState;
    });
    
    if (selectedModel)
      filtered = filtered.filter((equipment) => equipment.equipmentModelId === selectedModel);
    if (selectedState) {
      filtered = filtered.filter((equipment) => {
        const currentState = getLatestState(equipment.id);
        return currentState && currentState.id === selectedState;
      });
    }
    if (search)
      filtered = filtered.filter((equipment) => equipment.name.toLowerCase().includes(search.toLowerCase()));  
    
    setFilteredEquipment(filtered);
  }, [equipmentData, selectedModel, selectedState, search]);

  useEffect(() => {
    const newMarkers = filteredEquipment.map((equipment) => {
      const position = getLatestPosition(equipment.id);
      const state = getLatestState(equipment.id);

      if (!position) return null;

      return {
        id: equipment.id,
        position: [position.lat, position.lon] as [number, number],
        name: equipment.name,
        model: equipmentModelData.find((model) => model.id === equipment.equipmentModelId)?.name,
        state: state ? { name: state.name, color: state.color } : null,
      };
    }).filter(Boolean) as MarkerData[];

    setMapMarkers(newMarkers);
  }, [filteredEquipment]);

  function FitBoundsToMarkers() {
    const map = useMap();
    useEffect(() => {
      if (mapMarkers.length > 0) {
        const bounds = mapMarkers.map((marker) => marker.position);
        map.fitBounds(bounds);
      }
    }, [mapMarkers]);

    return null;
  }

  return (
    <div className="container mx-auto p-4 h-full flex flex-col">
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Buscar equipamento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-3 py-2"
          />
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">Todos os modelos</option>
            {equipmentModelData.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">Todos os estados</option>
            {equipmentStateData.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md flex-1">
        <MapContainer
          zoom={0}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapMarkers.map((marker) => (
            <div key={marker.id}>
              <Marker position={marker.position} icon={getIcon(marker.model as any, marker.state?.name as any)}>
                <Popup>
                  <div className="p-2">
                    <Link
                      to={`/equipment/${marker.id}`}
                      className="font-bold hover:text-blue-600 hover:underline"
                    >
                      {marker.name}
                    </Link>
                    {marker.state && (
                      <div
                        className="mt-1 px-2 py-1 rounded text-white text-sm"
                        style={{ backgroundColor: marker.state.color }}
                      >
                        {marker.state.name}
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            </div>
          ))}
          <FitBoundsToMarkers />
        </MapContainer>
      </div>
    </div>
  );
}
