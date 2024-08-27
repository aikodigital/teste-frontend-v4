'use client';
import { MapContainer, TileLayer } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import mapStyle from './map.module.css'
import 'leaflet/dist/leaflet.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectEquipmentsLatestData } from '../../../../store/selectors/selectEquipmentsLatestData';
import Markers from '../markers/markers';
import { setEquipmentLatestHistory } from '../../../../store/slices/equipmentPositionHistorySlice';

export default function MapDisplay() {
    const equipmentStateHistory = useSelector((state) => state.equipmentStateHistory.data)
    const equipmentState = useSelector((state) => state.equipmentState.data);
    const equipmentPositionHistory = useSelector((state) => state.equipmentPositionHistory.data)
    const equipment = useSelector((state) => state.equipment.data)
    const dispatch = useDispatch();
    const [equipmentsLatestData, setEquipmentsLatestData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const filteredStateModel = useSelector((state) => state.equipmentStateHistory.filteredStateModel)
    const equipmentLatestHistory = useSelector((state) => state.equipmentPositionHistory.equipmentLatestHistory)
    const [initialLoad, setInitialLoad] = useState(false)



    useEffect(() => {
        if (!initialLoad && equipmentsLatestData.length === 0) {

            const equipmentsData = selectEquipmentsLatestData({
                equipmentStateHistory: { data: equipmentStateHistory },
                equipmentState: { data: equipmentState },
                equipmentPositionHistory: { data: equipmentPositionHistory },
                equipment: { data: equipment }
            });
            setEquipmentsLatestData(equipmentsData);

        }

        if (!initialLoad && equipmentsLatestData.length > 0) {
            setInitialLoad(true)
        }

        if (equipmentsLatestData.length > 0 && !isLoaded) {
            setIsLoaded(true);
            dispatch(setEquipmentLatestHistory(equipmentsLatestData));
        }


    }, [equipmentsLatestData, isLoaded, dispatch]);

    useEffect(() => {
        if (filteredStateModel) {
            setEquipmentsLatestData(filteredStateModel)
        } else {
            setEquipmentsLatestData(equipmentLatestHistory)
        }
    }, [filteredStateModel])



    return (
        <>
            {isLoaded && <MapContainer center={[(equipmentsLatestData?.[0]?.lat ?? equipmentLatestHistory?.[0]?.lat), (equipmentsLatestData?.[0]?.lon || equipmentLatestHistory?.[0]?.lon)]}
                zoom={13}
                scrollWheelZoom={true}
                className={mapStyle.mapBox} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Markers equipmentsLatestData={equipmentsLatestData} />
            </MapContainer>}
        </>

    );
}