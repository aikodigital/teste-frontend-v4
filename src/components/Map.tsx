import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import truck_operando from '../assets/truckoperando.png';
import arrow from '../assets/arrow.png';
import startIcon from '../assets/point.png';
import endIcon from '../assets/finish.png';
import equipmentData from '../data/equipment.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import equipmentModelData from '../data/equipmentModel.json';
import Sidebar from './Sidebar.tsx';

// Definições de tipos para os dados
interface Equipment {
    id: string;
    name: string;
    position: {
        lat: number;
        lon: number;
    };
    equipmentModelId: string;
}

interface StateHistory {
    equipmentStateId: string;
    date: string;
}

interface EquipmentModel {
    id: string;
    name: string;
}

interface Filters {
    name: string[];
    model: string[];
    state: string[];
}
interface Position {
    lat: number;
    lon: number;
}
interface MapProps {
    equipmentPositions: Equipment[];
}

const Map: React.FC<MapProps> = ({ equipmentPositions }) => {
    const [equipmentMap, setEquipmentMap] = useState<Record<string, string>>({});

    const [equipmentStateMap, setEquipmentStateMap] = useState<Record<string, {
        name: string; color: string
    }>>({});
    const [equipmentModelMap, setEquipmentModelMap] = useState<Record<string, EquipmentModel>>({});
    const [equipmentStateHistoryMap, setEquipmentStateHistoryMap] = useState<Record<string, string>>({});
    const [selectedStates, setSelectedStates] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [filters, setFilters] = useState<Filters>({ name: [], model: [], state: [] });
    const [positions, setPositions] = useState<Position[]>([]);

    const calculateAngle = (p1: Position, p2: Position) => {
        const deltaY = p2.lat - p1.lat;
        const deltaX = p2.lon - p1.lon;
        const angleInDegrees = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        return angleInDegrees;
    };

    const arrowIcon = (angle: number) => L.divIcon({
        html: `<img src="${arrow}" style="transform: rotate(${angle}deg); width: 32px; height: 32px;" />`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
    });
    const startMarkerIcon = L.icon({
        iconUrl: startIcon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const endMarkerIcon = L.icon({
        iconUrl: endIcon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            ${positions.map((_, idx) => `
                .arrow-icon-${idx} {
                    transform: rotate(${idx}deg);
                }
            `).join('')}
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, [positions]);

    useEffect(() => {
        const equipmentMap = equipmentData.reduce<Record<string, string>>((map, equipment) => {
            map[equipment.id] = equipment.name;
            return map;
        }, {});

        const equipmentStateMap = equipmentStateData.reduce<Record<string, { name: string; color: string }>>((map, state) => {
            map[state.id] = { name: state.name, color: state.color };
            return map;
        }, {});

        const equipmentModelMap = equipmentModelData.reduce<Record<string, EquipmentModel>>((map, model) => {
            map[model.id] = model;
            return map;
        }, {});

        const equipmentStateHistoryMap = equipmentStateHistoryData.reduce<Record<string, string>>((map, history) => {
            const latestState = history.states.reduce<StateHistory>((latest, state) => {
                return new Date(state.date) > new Date(latest.date) ? state : latest;
            }, { equipmentStateId: '', date: '1970-01-01T00:00:00.000Z' });
            if (latestState) {
                map[history.equipmentId] = latestState.equipmentStateId;
            }
            return map;
        }, {});

        setEquipmentMap(equipmentMap);
        setEquipmentStateMap(equipmentStateMap);
        setEquipmentModelMap(equipmentModelMap);
        setEquipmentStateHistoryMap(equipmentStateHistoryMap);
    }, []);


    const applyFilters = (equipment: Equipment) => {
        const equipmentName = equipmentMap[equipment.id] || '';
        const modelId = equipmentData.find(e => e.id === equipment.id)?.equipmentModelId || '';
        const equipmentModelName = equipmentModelMap[modelId]?.name || '';
        const stateId = equipmentStateHistoryMap[equipment.id] || '';
        const stateName = equipmentStateMap[stateId]?.name || '';

        // Ensure that filters are arrays of strings
        const nameFilter = filters.name.map(name => name.toLowerCase());
        const modelFilter = filters.model.map(model => model.toLowerCase());
        const stateFilter = filters.state.map(state => state.toLowerCase());

        const matchesName = nameFilter.length === 0 || nameFilter.some(name => equipmentName.toLowerCase().includes(name));
        const matchesModel = modelFilter.length === 0 || modelFilter.some(model => equipmentModelName.toLowerCase().includes(model));
        const matchesState = stateFilter.length === 0 || stateFilter.some(state => stateName.toLowerCase().includes(state));

        return matchesName && matchesModel && matchesState;
    };

    const sortByDate = (stateHistory: StateHistory[]) => {
        return [...stateHistory].sort((a, b) => {
            if (sortOrder === 'desc') {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            } else {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
        });
    };

    const filterByState = (stateHistory: StateHistory[]) => {
        if (selectedStates.length === 0) return stateHistory;
        return stateHistory.filter(state => selectedStates.includes(state.equipmentStateId));
    };

    const handleStateFilterChange = (stateId: string) => {
        setSelectedStates(prevSelectedStates =>
            prevSelectedStates.includes(stateId)
                ? prevSelectedStates.filter(id => id !== stateId)
                : [...prevSelectedStates, stateId]
        );
    };

    const handleSortOrderChange = (order: 'asc' | 'desc') => {
        setSortOrder(order);
    };

    const handleApplyFilters = (newFilters: Filters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({ name: [], model: [], state: [] });
    };

    const truckIcon = L.icon({
        iconUrl: truck_operando,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
    const handleFilterPositions = (filteredPositions: Position[]) => {
        setPositions(filteredPositions);
        console.log("Posições filtradas recebidas no Map:", filteredPositions);
    };

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <Sidebar
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
                equipmentData={equipmentData}
                equipmentModelData={equipmentModelData}
                equipmentStateData={equipmentStateData} equipmentStateHistoryData={[]}
                onFilter={handleFilterPositions} />

            <MapContainer center={[-19.126536, -45.947756]} zoom={10} style={{ height: '100vh', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {equipmentPositions.filter(applyFilters).map((equipment) => {
                    const equipmentName = equipmentMap[equipment.id] || 'Unknown';
                    const modelId = equipmentData.find(e => e.id === equipment.id)?.equipmentModelId || '';
                    const equipmentModelName = equipmentModelMap[modelId]?.name || 'Unknown';
                    const stateId = equipmentStateHistoryMap[equipment.id] || '';
                    const stateInfo = equipmentStateMap[stateId] || { name: 'Unknown', color: 'gray' };
                    const stateName = stateInfo.name;
                    const stateColor = stateInfo.color;
                    const stateHistory = equipmentStateHistoryData.find(history => history.equipmentId === equipment.id)?.states || [];
                    const sortedStateHistory = sortByDate(stateHistory);
                    const filteredStateHistory = filterByState(sortedStateHistory);

                    return (
                        <Marker
                            key={equipment.id}
                            position={[equipment.position.lat, equipment.position.lon]}
                            icon={truckIcon}
                        >
                            <Tooltip>
                                <div style={{ backgroundColor: stateColor, padding: '10px', borderRadius: '5px', color: 'white' }}>
                                    Nome: {equipmentName}<br />
                                    Modelo: {equipmentModelName}<br />
                                    Estado Atual: {stateName}
                                </div>
                            </Tooltip>
                            <Popup>
                                <div>
                                    <strong>Informações do Equipamento:</strong>
                                    <div>
                                        <p><strong>Nome:</strong> {equipmentName}</p>
                                        <p><strong>Modelo:</strong> {equipmentModelName}</p>
                                    </div>

                                    <strong>Histórico de Estado:</strong>
                                    <div>
                                        {equipmentStateData.map((state) => (
                                            <label key={state.id}>
                                                <input
                                                    type="checkbox"
                                                    value={state.id}
                                                    onChange={() => handleStateFilterChange(state.id)}
                                                    checked={selectedStates.includes(state.id)}
                                                />
                                                {state.name}
                                            </label>
                                        ))}
                                    </div>

                                    <div style={{ marginTop: '1rem' }}>
                                        <strong>Ordenação pela data:</strong><br />
                                        <label>
                                            <input
                                                type="radio"
                                                name="sortOrder"
                                                value="desc"
                                                checked={sortOrder === 'desc'}
                                                onChange={() => handleSortOrderChange('desc')}
                                            />
                                            Do mais recente para o mais antigo
                                        </label><br />
                                        <label>
                                            <input
                                                type="radio"
                                                name="sortOrder"
                                                value="asc"
                                                checked={sortOrder === 'asc'}
                                                onChange={() => handleSortOrderChange('asc')}
                                            />
                                            Do mais antigo para o mais recente
                                        </label>
                                    </div>

                                    <ul style={{ maxHeight: '40vh', overflow: 'auto', padding: '0', marginTop: '10px' }}>
                                        {filteredStateHistory.map(state => (
                                            <li key={state.date}>
                                                {equipmentStateMap[state.equipmentStateId]?.name || 'Desconhecido'}: {state.date}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
                <Polyline positions={positions.map(pos => [pos.lat, pos.lon])} color="blue" />

                {positions.length > 1 && positions.slice(1).map((pos, index) => {
                    const prevPos = positions[index];
                    const angle = calculateAngle(prevPos, pos);
                    return (
                        <Marker
                            key={`arrow-${index}`}
                            position={[(prevPos.lat + pos.lat) / 2, (prevPos.lon + pos.lon) / 2]}
                            icon={arrowIcon(angle)}
                        >
                            <Popup>{pos.lat} {pos.lon}</Popup>
                        </Marker>
                    );
                })}
                {positions.length > 0 && (
                    <>
                        <Marker
                            position={[positions[0].lat, positions[0].lon]}
                            icon={startMarkerIcon}
                        >
                            <Popup>Início</Popup>
                        </Marker>

                        <Marker
                            position={[positions[positions.length - 1].lat, positions[positions.length - 1].lon]}
                            icon={endMarkerIcon}
                        >
                            <Popup>Chegada</Popup>
                        </Marker>
                    </>
                )}
            </MapContainer>
        </div>
    );
};

export default Map;
