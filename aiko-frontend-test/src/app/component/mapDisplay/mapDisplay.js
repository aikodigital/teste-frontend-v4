'use client';
import { MapContainer, TileLayer } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import mapStyle from './map.module.css'
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import Markers from '../markers/markers';
import { useEquipmentsContext } from '@/app/context/equipmentsContext';
import { selectEquipmentsProductiveHours } from '../../../../store/selectors/selectEquipmentsProductiveHours';

export default function MapDisplay() {

    const [isLoaded, setIsLoaded] = useState(false);
    const equipmentLatestHistory = useSelector((state) => state.equipmentPositionHistory.equipmentLatestHistory)
    const { equipmentsMapMarkers } = useEquipmentsContext();


    useEffect(() => {

        if (equipmentsMapMarkers.length > 0 && !isLoaded) {
            setIsLoaded(true);
        }

    }, [equipmentsMapMarkers, isLoaded]);


    return (
        <>
            {isLoaded && <MapContainer center={[(equipmentsMapMarkers?.[0]?.lat ?? equipmentLatestHistory?.[0]?.lat), (equipmentsMapMarkers?.[0]?.lon || equipmentLatestHistory?.[0]?.lon)]}
                zoom={13}
                scrollWheelZoom={true}
                className={mapStyle.mapBox} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Markers equipmentsLatestData={equipmentsMapMarkers} />
            </MapContainer>}
        </>

    );
}