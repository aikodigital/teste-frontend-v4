import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getEquipment, getEquipmentPositionHistory, getEquipmentStateHistory, getEquipmentStates } from '../utils/dataLoader';
import L from 'leaflet';
import StateHistoryModal from './StateHistoryModal';
import './MapComponent.css';


import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = () => {
    const [markers, setMarkers] = useState([]);
    const [selectedEquipmentStateHistory, setSelectedEquipmentStateHistory] = useState(null);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [filterState, setFilterState] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const equipmentStates = getEquipmentStates();
    const equipmentList = getEquipment();

    useEffect(() => {
        const latestPositions = getEquipmentPositionHistory().map(equip => {
            const lastPosition = equip.positions[equip.positions.length - 1];
            const equipment = equipmentList.find(eq => eq.id === equip.equipmentId);
            return {
                id: equip.equipmentId,
                name: equipment ? equipment.name : `Equipamento ${equip.equipmentId}`,
                lat: lastPosition.lat,
                lon: lastPosition.lon,
                positions: equip.positions
            };
        });

        setMarkers(latestPositions);
    }, [equipmentList]);

    const getStateColor = (equipmentId) => {
        const equipmentStateHistory = getEquipmentStateHistory().find(hist => hist.equipmentId === equipmentId);
        if (!equipmentStateHistory || equipmentStateHistory.states.length === 0) return 'gray';
        const lastState = equipmentStateHistory.states[equipmentStateHistory.states.length - 1];
        const stateInfo = equipmentStates.find(state => state.id === lastState.equipmentStateId);
        return stateInfo ? stateInfo.color : 'gray';
    };

    const getStateName = (equipmentId) => {
        const equipmentStateHistory = getEquipmentStateHistory().find(hist => hist.equipmentId === equipmentId);
        if (!equipmentStateHistory || equipmentStateHistory.states.length === 0) return 'Desconhecido';
        const lastState = equipmentStateHistory.states[equipmentStateHistory.states.length - 1];
        const stateInfo = equipmentStates.find(state => state.id === lastState.equipmentStateId);
        return stateInfo ? stateInfo.name : 'Desconhecido';
    };

    const filteredMarkers = markers.filter(marker => {
        const matchesState = filterState ? getStateName(marker.id) === filterState : true;
        const matchesSearch = marker.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesState && matchesSearch;
    });

    const handleMarkerClick = (equipmentId) => {
        const equipment = equipmentList.find(eq => eq.id === equipmentId);
        setSelectedEquipment(equipment);
    };

    const handleViewHistoryClick = () => {
        if (selectedEquipment) {
            const stateHistory = getEquipmentStateHistory().find(hist => hist.equipmentId === selectedEquipment.id);
            setSelectedEquipmentStateHistory(stateHistory);
        }
    };

    const handleFilterChange = (event) => {
        setFilterState(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <div className="controls">
                <input 
                    type="text" 
                    placeholder="Pesquisar equipamento" 
                    value={searchTerm}
                    onChange={handleSearchChange} 
                />
                <select value={filterState} onChange={handleFilterChange}>
                    <option value="">Todos os estados</option>
                    {equipmentStates.map(state => (
                        <option key={state.id} value={state.name}>{state.name}</option>
                    ))}
                </select>
            </div>

            <MapContainer center={[-19.126536, -45.947756]} zoom={13} style={{ height: '100vh' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredMarkers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={[marker.lat, marker.lon]}
                        icon={L.divIcon({
                            className: 'custom-marker',
                            html: `<div style="background-color:${getStateColor(marker.id)}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`
                        })}
                        eventHandlers={{
                            click: () => handleMarkerClick(marker.id),
                        }}
                    >
                        <Popup>
                            <div>
                                <h4>{marker.name}</h4>
                                <p><strong>Estado:</strong> <span style={{ color: getStateColor(marker.id) }}>{getStateName(marker.id)}</span></p>
                                <button onClick={handleViewHistoryClick}>Ver Histórico</button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {selectedEquipmentStateHistory && selectedEquipment && (
                <StateHistoryModal 
                    stateHistory={selectedEquipmentStateHistory} 
                    equipment={selectedEquipment}
                    equipmentStates={equipmentStates}
                    onClose={() => setSelectedEquipmentStateHistory(null)}
                />
            )}
        </div>
    );
};

export default MapComponent;
