'use client';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import React from 'react';
import './map.module.css'
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useSelector } from 'react-redux';

export default function MapDisplay() {

    const markerIcon = new Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
        iconSize: [25, 38]
    })


    const equipment = useSelector((state) => state.equipment.data);
    const equipmentModel = useSelector((state) => state.equipmentModel.data);
    const equipmentState = useSelector((state) => state.equipmentState.data);
    const equipmentPositionHistory = useSelector((state) => state.equipmentPositionHistory.data);
    const equipmentStateHistory = useSelector((state) => state.equipmentStateHistory.data);



    return (
        <>
            {equipmentPositionHistory.length && <MapContainer center={[equipmentPositionHistory[0].positions[0].lat, equipmentPositionHistory[0].positions[0].lon]} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[equipmentPositionHistory[0].positions[0].lat, equipmentPositionHistory[0].positions[0].lon]} icon={markerIcon}>
                    <Popup>
                        Lat:{equipmentPositionHistory[0].positions[0].lat} <br /> Lon: {equipmentPositionHistory[0].positions[0].lon}
                    </Popup>
                </Marker>
            </MapContainer>}
        </>

    );
}