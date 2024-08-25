"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import equipmentData from '../../data/equipment.json';
import equipmentModelData from '../../data/equipmentModel.json';
import equipmentStateData from '../../data/equipmentState.json';
import equipmentStateHistoryData from '../../data/equipmentStateHistory.json';
import equipmentPositionHistoryData from '../../data/equipmentPositionHistory.json';
import HoverableMarker from '../MapMarker/MapMarker';
import { Equipment } from '../../types/equipment';
import { DynamicToolMapProps } from './DynamicMap';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

const ToolMap = ({ isShowingHistory, onMarkerClick }: DynamicToolMapProps) => {
  const [processedData, setProcessedData] = useState<Equipment[]>([]);

  useEffect(() => {
    if(!isShowingHistory) {
      getInitialMapState();
    }
  }, [isShowingHistory]);

  const getInitialMapState = () => {
    const data = equipmentData.map(equipment => {
      const positionHistory = equipmentPositionHistoryData.find(ep => ep.equipmentId === equipment.id);
      const stateHistory = equipmentStateHistoryData.find(es => es.equipmentId === equipment.id);

      if (!positionHistory || !stateHistory) return null;

      const mostRecentPosition = positionHistory.positions.reduce((prev, current) => (
        new Date(prev.date) > new Date(current.date) ? prev : current
      ));
      const mostRecentState = stateHistory.states.reduce((prev, current) => (
        new Date(prev.date) > new Date(current.date) ? prev : current
      ));

      const stateDetails = equipmentStateData.find(state => state.id === mostRecentState.equipmentStateId);
      const modelDetails = equipmentModelData.find(model => model.id === equipment.equipmentModelId);

      return {
        id: equipment.id,
        name: equipment.name,
        model: modelDetails?.name || 'Unknown',
        position: mostRecentPosition,
        state: stateDetails?.name || 'Unknown',
        stateColor: stateDetails?.color || '#000000',
        stateHistory: positionHistory.positions,
      } as Equipment;
    }).filter(e => e !== null);

    setProcessedData(data);
  }

  const handleMarkerClick = (equipment: Equipment) => {
    console.log(equipment)
    const updatedData: Equipment[] = equipment.stateHistory.map(history => ({
      id: history.date,
      name: equipment.name,
      model: equipment.model,
      position: history,
      state: equipment.state,
      stateColor: equipment.stateColor,
      stateHistory: equipment.stateHistory,
    }));
    onMarkerClick();
    setProcessedData(updatedData);
  };

  return (
    <MapContainer center={[-19.126536, -45.947756]} zoom={10} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {processedData.map((equipment: Equipment) => (
        <HoverableMarker
          key={equipment.id}
          position={[equipment.position.lat, equipment.position.lon]}
          equipment={equipment}
          onClick={handleMarkerClick}
        />
      ))}
    </MapContainer>
  );
};

export default ToolMap;