import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { FaCar, FaFilter } from 'react-icons/fa';

import { MapProps } from './map/types';
import { customIcon, iconMapping } from './map/icons';
import { colors } from './map/constants';
import { getPositionsHistoryWithModelId, getEnrichedStates } from './map/functions';

import LayerIcon from '../assets/icons/icon-layer.png';

const Map: React.FC<MapProps> = ({ onEquipmentClick }) => {
    const [currentLayer, setCurrentLayer] = useState('google');
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);

    const positionsHistoryWithModelId = getPositionsHistoryWithModelId();
    const enrichedStates = getEnrichedStates();

    const filterEquipments = () => {
        return positionsHistoryWithModelId.filter(equipment => {
            const stateMatch = !selectedState || enrichedStates.find(state => state.equipmentId === equipment.equipmentId)?.stateName === selectedState;
            const modelMatch = !selectedModel || equipment.equipmentModelName === selectedModel;
            return stateMatch && modelMatch;
        });
    };

    const toggleLayer = () => {
        setCurrentLayer(prevLayer => prevLayer === 'google' ? 'openstreetmap' : 'google');
    };

    const getLayerUrl = () => {
        return currentLayer === 'google'
            ? 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    };

    const filteredPositions = filterEquipments();

    const stateOptions = Array.from(new Set(enrichedStates.map(state => state.stateName))).sort();
    const modelOptions = Array.from(new Set(positionsHistoryWithModelId.map(e => e.equipmentModelName))).sort();

    return (
        <div className="h-full relative">
            <div
                onClick={toggleLayer}
                className="absolute top-3 right-3 z-[500] bg-white p-2 rounded border-2 border-gray-400 cursor-pointer hover:bg-gray-100"
            >
                <img
                    src={LayerIcon}
                    alt="layer-icon"
                    className="w-6 h-6"
                />
            </div>

            <div className="flex items-center absolute top-3 left-1/2 transform -translate-x-1/2 z-[500] bg-white p-3 rounded border-2 border-gray-400">
                <div className="flex-1 flex items-center space-x-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <FaFilter className="h-4 w-4 text-secondary" />
                            <label htmlFor="state-filter" className="block text-sm font-medium text-gray-800">Filtrar por Estado</label>
                        </div>
                        <select
                            id="state-filter"
                            value={selectedState || ''}
                            onChange={(e) => setSelectedState(e.target.value || null)}
                            className="p-1 mt-2 block w-full border border-gray-400 rounded text-gray-800 cursor-pointer"
                        >
                            <option value="">Todos os estados</option>
                            {stateOptions.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex-1 flex items-center space-x-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <FaCar className="h-5 w-5 text-secondary" />
                            <label htmlFor="model-filter" className="block text-sm font-medium text-gray-800">Filtrar por Modelo</label>
                        </div>
                        <select
                            id="model-filter"
                            value={selectedModel || ''}
                            onChange={(e) => setSelectedModel(e.target.value || null)}
                            className="p-1 mt-2 block w-full border border-gray-400 rounded text-gray-800 cursor-pointer"
                        >
                            <option value="">Todos os modelos</option>
                            {modelOptions.map(model => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <MapContainer
                center={[filteredPositions[0]?.latestPosition?.lat || 0, filteredPositions[0]?.latestPosition?.lon || 0]}
                zoom={10}
                minZoom={5}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url={getLayerUrl()}
                    attribution=''
                />
                {filteredPositions.map((equipment, index) => (
                    <React.Fragment key={equipment.equipmentId}>
                        {equipment.recentPositions.length > 1 && (
                            <Polyline
                                positions={equipment.recentPositions.map(pos => [pos.lat, pos.lon])}
                                color={colors[index % colors.length]}
                                weight={3}
                                opacity={1}
                            />
                        )}
                        {equipment.latestPosition && (
                            <Marker
                                position={[equipment.latestPosition.lat, equipment.latestPosition.lon]}
                                icon={iconMapping[equipment.equipmentModelName] || customIcon}
                                eventHandlers={{
                                    click: () => onEquipmentClick(equipment.equipmentId, equipment.latestPosition.date),
                                }}
                            >
                                <Popup>
                                    <div>
                                        <p>Modelo: {equipment.equipmentModelName}</p>
                                        <p>Latitude: {equipment.latestPosition.lat}</p>
                                        <p>Longitude: {equipment.latestPosition.lon}</p>
                                        <p>Posição atualizada em: {new Date(equipment.latestPosition.date).toLocaleString()}</p>
                                        {enrichedStates.find(state => state.equipmentId === equipment.equipmentId) && (
                                            <p>
                                                Estado atual:
                                                <span style={{ color: enrichedStates.find(state => state.equipmentId === equipment.equipmentId)?.stateColor }}>
                                                    {` ${enrichedStates.find(state => state.equipmentId === equipment.equipmentId)?.stateName}`}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        )}
                    </React.Fragment>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
