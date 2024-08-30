import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapProps {
    selectedStates: string[]; 
  }

interface Equipment {
    id: string;
    name: string;
    equipmentModelId: string;
}

interface EquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: HourlyEarnings[];
}

interface HourlyEarnings {
    equipmentStateId: string;
    value: number;
}

interface Position {
    date: string;
    lat: number;
    lon: number;
}

interface EquipmentPosition {
    equipmentId: string;
    positions: Position[];
}

interface EquipmentState {
    id: string;
    name: string;
    color: string;
}

interface EquipmentStateHistory {
    equipmentId: string;
    states: {
        date: string;
        equipmentStateId: string;
    }[];
}

const fetchEquipmentPositions = async (): Promise<EquipmentPosition[]> => {
    const response = await fetch('./data/equipmentPositionHistory.json');
    const data: EquipmentPosition[] = await response.json();
    return data;
};

const fetchEquipments = async (): Promise<Equipment[]> => {
    const response = await fetch('./data/equipment.json');
    const data = await response.json();
    return data;
};

const fetchEquipmentModels = async (): Promise<EquipmentModel[]> => {
    const response = await fetch('./data/equipmentModel.json');
    const data: EquipmentModel[] = await response.json();
    return data;
};

const fetchEquipmentStates = async (): Promise<EquipmentState[]> => {
    const response = await fetch('./data/equipmentState.json');
    const data: EquipmentState[] = await response.json();
    return data;
};

const fetchEquipmentStateHistory = async (): Promise<EquipmentStateHistory[]> => {
    const response = await fetch('./data/equipmentStateHistory.json');
    const data: EquipmentStateHistory[] = await response.json();
    return data;
};

const createEquipmentMap = (data: Equipment[]) => {
    return data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {} as { [key: string]: Equipment });
};

const createEquipmentModelMap = (data: EquipmentModel[]) => {
    return data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {} as { [key: string]: EquipmentModel });
};

const createEquipmentStateMap = (data: EquipmentState[]) => {
    return data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {} as { [key: string]: EquipmentState });
};

const getLatestPositions = (data: EquipmentPosition[]) => {
    return data.map(equipment => {
        const latestPosition = equipment.positions.reduce((latest, current) => {
            return new Date(current.date) > new Date(latest.date) ? current : latest;
        }, equipment.positions[0]);

        return {
            equipmentId: equipment.equipmentId,
            lat: latestPosition.lat,
            lon: latestPosition.lon
        };
    });
};

const getLatestState = (stateHistory: EquipmentStateHistory) => {
    return stateHistory.states.reduce((latest, current) => {
        return new Date(current.date) > new Date(latest.date) ? current : latest;
    });
};

const CenterMapOnUpdate = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
};

const Map: React.FC<MapProps> = ({ selectedStates }) => {
    const [positions, setPositions] = useState<{ equipmentId: string; lat: number; lon: number; }[]>([]);
    const [center, setCenter] = useState<[number, number]>([0, 0]);
    const [equipmentMap, setEquipmentMap] = useState<{ [key: string]: Equipment }>({});
    const [equipmentModelMap, setEquipmentModelMap] = useState<{ [key: string]: EquipmentModel }>({});
    const [equipmentStateMap, setEquipmentStateMap] = useState<{ [key: string]: EquipmentState }>({});
    const [equipmentStateHistory, setEquipmentStateHistory] = useState<{ [key: string]: EquipmentStateHistory }>({});

    useEffect(() => {
        const loadData = async () => {
            const positions = await fetchEquipmentPositions();
            const latestPositions = getLatestPositions(positions);
            setPositions(latestPositions);

            if (latestPositions.length > 0) {
                const firstPosition = latestPositions[0];
                setCenter([firstPosition.lat, firstPosition.lon]);
            }

            const equipments = await fetchEquipments();
            const equipmentsMap = createEquipmentMap(equipments);
            setEquipmentMap(equipmentsMap);

            const equipmentModels = await fetchEquipmentModels();
            const equipmentModelsMap = createEquipmentModelMap(equipmentModels);
            setEquipmentModelMap(equipmentModelsMap);

            const equipmentStates = await fetchEquipmentStates();
            const equipmentStatesMap = createEquipmentStateMap(equipmentStates);
            setEquipmentStateMap(equipmentStatesMap);

            const equipmentStateHistory = await fetchEquipmentStateHistory();
            setEquipmentStateHistory(equipmentStateHistory.reduce((acc, item) => {
                acc[item.equipmentId] = item;
                return acc;
            }, {} as { [key: string]: EquipmentStateHistory }));
        };

        loadData();
    }, []);

    const filteredPositions = positions.filter((position) => {
        const stateHistory = equipmentStateHistory[position.equipmentId];
        const latestState = stateHistory && getLatestState(stateHistory);
        const equipmentState = latestState && equipmentStateMap[latestState.equipmentStateId];
       
        return equipmentState && selectedStates.includes(equipmentState.name);
    });

    return (
        <MapContainer center={center} zoom={13} style={{ height: "100vh", width: "100vw" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <CenterMapOnUpdate center={center} />
            {filteredPositions.map((position, idx) => {
                const equipment = equipmentMap[position.equipmentId];
                const equipmentModel = equipment && equipmentModelMap[equipment.equipmentModelId];
                const stateHistory = equipmentStateHistory[position.equipmentId];
                const latestState = stateHistory && getLatestState(stateHistory);
                const equipmentState = latestState && equipmentStateMap[latestState.equipmentStateId];

                return (
                    <Marker
                        key={idx}
                        position={[position.lat, position.lon]}
                        icon={L.divIcon({
                            className: 'custom-icon',
                            html: `<div style="background-color: ${equipmentState ? equipmentState.color : 'white'}; padding: 5px; border-radius: 3px; border: 1px solid black; font-size: 12px; text-align: center;">
                                ${equipment ? equipment.name : ''}
                            </div>`,
                            iconSize: [65, 40]
                        })}>
                        <Popup>
                            <b>Nome do equipamento:</b> {equipment ? equipment.name : ''} <br /><br />
                            <b>ID:</b> {position.equipmentId} <br /><br />
                            <b>Modelo:</b> {equipmentModel ? equipmentModel.name : ''} <br /><br />
                            <b>Estado:</b> {equipmentState ? equipmentState.name : ''} <br /><br />
                            <b>Histórico:</b> <br />
                            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                <ul style={{ padding: 0, margin: 0 }}>
                                    {stateHistory?.states
                                        .slice()
                                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                        .map((state, index) => {
                                            const stateInfo = equipmentStateMap[state.equipmentStateId];
                                            return (
                                                <li key={index} style={{ listStyleType: 'none', margin: '5px 0', color: stateInfo?.color || 'black' }}>
                                                    <b>{stateInfo ? stateInfo.name : ''}</b> - {new Date(state.date).toLocaleString()}
                                                </li>
                                            );
                                        })}
                                </ul>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default Map;