// src/app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Map, { Marker, ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import EquipmentMarker from '../components/EquipmentMarker';
import EquipmentStateHistoryModal from '../components/EquipmentStateHistoryModal';
import { getEquipmentData } from '../utils/getEquipmentData';
import { EquipmentWithPositionAndState, EquipmentStateHistory } from '../interfaces/types';

const Page: React.FC = () => {
  const [equipmentData, setEquipmentData] = useState<EquipmentWithPositionAndState[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentWithPositionAndState | null>(null);
  const [stateHistory, setStateHistory] = useState<EquipmentStateHistory | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewState, setViewState] = useState<ViewState>({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEquipmentData();
      setEquipmentData(data.equipmentData);
    };

    fetchData();
  }, []);

  const handleMarkerClick = async (equipment: EquipmentWithPositionAndState) => {
    setSelectedEquipment(equipment);
    setModalIsOpen(true);

    const response = await fetch(`/api/equipmentStateHistory/${equipment.id}`);
    const history = await response.json();
    setStateHistory(history);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setSelectedEquipment(null);
    setStateHistory(null);
  };

  return (
    <div>
      <Map
        initialViewState={viewState}
        style={{ width: '100%', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
        onMove={(evt) => setViewState(evt.viewState)}
      >
        {equipmentData.map((equipment) => (
          <EquipmentMarker
            key={equipment.id}
            equipment={equipment}
            onClick={handleMarkerClick}
          />
        ))}
      </Map>

      <EquipmentStateHistoryModal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        history={stateHistory}
      />
    </div>
  );
};

export default Page;
