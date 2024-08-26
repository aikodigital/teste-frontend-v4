'use client';
import { MapContainer, TileLayer } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import mapStyle from './map.module.css'
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { selectEquipmentsLatestData } from '../../../../store/selectors/selectEquipmentsLatestData';
import Markers from '../markers/markers';

export default function MapDisplay() {

    const equipmentsLatestData = useSelector(selectEquipmentsLatestData);
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        if (equipmentsLatestData && equipmentsLatestData.length > 0) {
            setIsLoaded(true);
        }

    }, [equipmentsLatestData]);



    return (
        <>
            {isLoaded && <MapContainer center={[equipmentsLatestData[0].lat, equipmentsLatestData[0].lon]} zoom={13} scrollWheelZoom={true} className={mapStyle.mapBox} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Markers equipmentsLatestData={equipmentsLatestData} />
            </MapContainer>}
        </>

    );
}