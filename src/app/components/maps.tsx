"use client";

import { useEffect, useState } from 'react';
import { Map, APIProvider, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import equipmentData from '../data/equipment.json';
import equipmentModelData from '../data/equipmentModel.json';
import equipmentPositionHistoryData from '../data/equipmentPositionHistory.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import Image from 'next/image';

interface EquipmentState {
    id: string;
    name: string;
    color: string;
}

interface EquipmentPosition {
    date: string;
    lat: number;
    lon: number;
}

interface EquipmentHourlyEarnings {
    equipmentStateId: string;
    value: number;
}

interface EquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: EquipmentHourlyEarnings[];
}

interface Equipment {
    id: string;
    equipmentModelId: string;
    name: string;
}

interface EquipmentStateHistory {
    date: string;
    equipmentStateId: string;
}

interface EquipmentStateHistoryData {
    equipmentId: string;
    states: EquipmentStateHistory[];
}

interface EquipmentData {
    equipment: Equipment;
    model: EquipmentModel;
    position: EquipmentPosition | null;
    state: EquipmentState;
    stateHistory: EquipmentStateHistory[];
}

const Maps = () => {
    const [data, setData] = useState<EquipmentData[]>([]);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData | null>(null);
    const [hoverPosition, setHoverPosition] = useState<EquipmentPosition | null>(null);
    const [selectedState, setSelectedState] = useState<string>(''); 
    const [selectedModel, setSelectedModel] = useState<string>(''); 
    const [infoWindowOpen, setInfoWindowOpen] = useState<boolean>(false); 

    useEffect(() => {
        const loadData = () => {
            const equipment = equipmentData as Equipment[];
            const models = equipmentModelData as EquipmentModel[];
            const positionsData = equipmentPositionHistoryData as { equipmentId: string; positions: EquipmentPosition[] }[];
            const states = equipmentStateData as EquipmentState[];
            const stateHistories = equipmentStateHistoryData as EquipmentStateHistoryData[];

            const combinedData: EquipmentData[] = equipment.map(e => {
                const model = models.find(m => m.id === e.equipmentModelId) || {} as EquipmentModel;
                const positionData = positionsData.find(p => p.equipmentId === e.id)?.positions || [];
                const stateHistory = stateHistories.find(sh => sh.equipmentId === e.id)?.states || [];
                const state = states.find(s => s.id === stateHistory[0]?.equipmentStateId) || {} as EquipmentState;

                const position = positionData.reduce((latest, pos) =>
                    new Date(pos.date) > new Date(latest.date) ? pos : latest,
                    positionData[0] || { date: '', lat: 0, lon: 0 }
                );

                return {
                    equipment: e,
                    model,
                    position: position.date ? position : null,
                    state,
                    stateHistory
                };
            });

            setData(combinedData);
        };
        loadData();
    }, []);


    const filteredData = data.filter(item => {
        const stateMatches = selectedState ? item.state.id === selectedState : true;
        const modelMatches = selectedModel ? item.model.id === selectedModel : true;
        return stateMatches && modelMatches;
    });

    const handleMarkerClick = (equipment: EquipmentData) => {
        setSelectedEquipment(equipment);
        setHoverPosition(null);
        setInfoWindowOpen(true); 
    };

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const latLng = event.latLng;
        if (latLng) {
            setHoverPosition({
                date: new Date().toISOString(), 
                lat: latLng.lat(),
                lon: latLng.lng()
            });
        }
    };

    const handleHistoryItemClick = (position: EquipmentPosition) => {
        setHoverPosition(position);
    };

    const handleInfoWindowClose = () => {
        setInfoWindowOpen(false);
        setSelectedEquipment(null);
    };

    const handleStateFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedState(event.target.value);
    };

    const handleModelFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModel(event.target.value);
    };

    return (
        <>
            <div className="map-container">
                <APIProvider apiKey="SUA API KEY">
                    <Map
                        id="map"
                        defaultCenter={{
                            lat: hoverPosition?.lat || selectedEquipment?.position?.lat || data[0]?.position?.lat || 0,
                            lng: hoverPosition?.lon || selectedEquipment?.position?.lon || data[0]?.position?.lon || 0
                        }}
                        defaultZoom={10}
                        onClick={handleMapClick}
                    >
                        {filteredData.map(equipmentData => (
                            equipmentData.position && (
                                <Marker
                                    key={equipmentData.equipment.id}
                                    position={{ lat: equipmentData.position.lat, lng: equipmentData.position.lon }}
                                    onClick={() => handleMarkerClick(equipmentData)}
                                />
                            )
                        ))}
                        {(hoverPosition || selectedEquipment) && infoWindowOpen && (
                            <InfoWindow
                                position={{
                                    lat: hoverPosition?.lat || selectedEquipment?.position?.lat || 0,
                                    lng: hoverPosition?.lon || selectedEquipment?.position?.lon || 0
                                }}
                                onCloseClick={handleInfoWindowClose}
                            >
                                <div className='item-hover'>
                                    {selectedEquipment ? (
                                        <>
                                            <Image
                                                src="/img/equipment.png"
                                                alt={selectedEquipment.equipment.name}
                                                width={50}
                                                height={50}
                                            />
                                            <h3>{selectedEquipment.equipment.name}</h3>
                                            <p>Modelo: {selectedEquipment.model.name}</p>
                                            <p>Estado: {selectedEquipment.state.name}</p>
                                            <p>Data: {new Date(hoverPosition?.date || selectedEquipment?.position?.date || new Date()).toLocaleDateString()}</p>
                                        </>
                                    ) : (
                                        <div>
                                            <h3>Hover Position</h3>
                                            <p>Lat: {hoverPosition?.lat ?? 'N/A'}</p>
                                            <p>Lon: {hoverPosition?.lon ?? 'N/A'}</p>
                                        </div>
                                    )}
                                </div>
                            </InfoWindow>
                        )}
                    </Map>
                </APIProvider>
            </div>
            <div id="sidebar">
                <div className="sidebar-item">
                    <div className={`filters ${selectedEquipment ? 'hidden-item' : ''}`}>
                        <label htmlFor="model-filter">Modelo:</label>
                        <select id="model-filter" onChange={handleModelFilterChange} value={selectedModel}>
                            <option value="">Todos</option>
                            {equipmentModelData.map(model => (
                                <option key={model.id} value={model.id}>{model.name}</option>
                            ))}
                        </select>

                        <label htmlFor="state-filter">Estado:</label>
                        <select id="state-filter" onChange={handleStateFilterChange} value={selectedState}>
                            <option value="">Todos</option>
                            {equipmentStateData.map(state => (
                                <option key={state.id} value={state.id}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={`equip-list ${selectedEquipment ? 'hidden-item' : ''}`}>
                        <h2>Equipamentos</h2>
                        <ul>
                            {selectedState === '' && selectedModel === '' ? (
                                data.map(equipment => (
                                    <li key={equipment.equipment.id}>{equipment.equipment.name}</li>
                                ))
                            ) : (
                                filteredData.map(equipment => (
                                    <li key={equipment.equipment.id}>{equipment.equipment.name}</li>
                                ))
                            )}
                        </ul>
                    </div>
                    {selectedEquipment && (
                        <>
                            <div className='history-container'>
                                <h3>Histórico de Localizações</h3>
                                {selectedEquipment.stateHistory.length > 0 ? (
                                    selectedEquipment.stateHistory.map((historyItem, index) => {
                                        const position = (equipmentPositionHistoryData as { equipmentId: string; positions: EquipmentPosition[] }[])
                                            .find(pos => pos.equipmentId === selectedEquipment.equipment.id)?.positions
                                            .find(pos => new Date(pos.date).toISOString() === new Date(historyItem.date).toISOString());

                                        return position ? (
                                            <div
                                                key={index}
                                                className="history-item"
                                                onClick={() => handleHistoryItemClick(position)}
                                            >
                                                <p>Data: {new Date(position.date).toLocaleDateString()} {new Date(position.date).toLocaleTimeString()}</p>
                                                <p>Localização: Lat {position.lat}, Lon {position.lon}</p>
                                            </div>
                                        ) : null;
                                    })
                                ) : (
                                    <p>Nenhum histórico de localização encontrado.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Maps;
