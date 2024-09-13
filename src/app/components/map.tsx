"use client";

import { useEffect, useState } from 'react';
import equipmentData from '../data/equipment.json';
import modelData from '../data/equipmentModel.json';
import positionData from '../data/equipmentPositionHistory.json';
import stateData from '../data/equipmentState.json';
import stateHistoryData from '../data/equipmentStateHistory.json';

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
    positions: EquipmentPosition[];
    state: EquipmentState;
    stateHistory: EquipmentStateHistory[];
}

const Map = () => {
    const [data, setData] = useState<EquipmentData[]>([]);

    useEffect(() => {
        const loadData = () => {
            try {
                const equipment: Equipment[] = equipmentData;
                const models: EquipmentModel[] = modelData;
                const positionsData = positionData;
                const positions: { equipmentId: string; positions: EquipmentPosition[] }[] = positionsData;
                const states: EquipmentState[] = stateData;
                const stateHistories: EquipmentStateHistoryData[] = stateHistoryData;

                const combinedData: EquipmentData[] = equipment.map(e => {
                    const model = models.find(m => m.id === e.equipmentModelId) || {} as EquipmentModel;
                    const position = positions.find(p => p.equipmentId === e.id)?.positions || [];
                    const stateHistory = stateHistories.find(sh => sh.equipmentId === e.id)?.states || [];
                    const state = states.find(s => s.id === stateHistory[0]?.equipmentStateId) || {} as EquipmentState;

                    return {
                        equipment: e,
                        model,
                        positions: position,
                        state,
                        stateHistory
                    };
                });

                setData(combinedData);
            } catch (error) {
                console.error('Error processing data', error);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        window.initMap = () => {
            if (!data.length) return;

            const map = new google.maps.Map(document.getElementById('map')!, {
                center: { lat: data[0].positions[0]?.lat || 0, lng: data[0].positions[0]?.lon || 0 },
                zoom: 10
            });

            data.forEach(equipmentData => {
                equipmentData.positions.forEach(position => {
                    new google.maps.Marker({
                        position: { lat: position.lat, lng: position.lon },
                        map: map,
                        title: `${equipmentData.equipment.name} - ${equipmentData.model.name} (${equipmentData.state.name})`
                    });
                });
            });
        };

        const loadScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDdoiLfJCIf4y7lLiXmgWNPXuycNQd75Zk&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        };

        loadScript();
    }, [data]);

    return <div id="map"></div>;
};

export default Map;
