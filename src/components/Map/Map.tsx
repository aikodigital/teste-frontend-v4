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
import { Equipment, stateData } from '../../types/equipment';
import { DynamicToolMapProps } from './DynamicMap';
import { formatDateToDMY } from '../../utils/dateFormatter';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

const ToolMap = ({ isShowingHistory, onMarkerClick }: DynamicToolMapProps) => {
  const [processedData, setProcessedData] = useState<Equipment[]>([]);
  const [equipmentStates, setEquipmentStates] = useState<stateData[]>([]);

  useEffect(() => {
    if(!isShowingHistory) {
      getInitialMapState();
      setEquipmentStates([]);
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
    const stateHistory = equipmentStateHistoryData.find(es => es.equipmentId === equipment.id);
    const eqStates = stateHistory.states.map(state => {
      const stateData = equipmentStateData.find(esd => esd.id === state.equipmentStateId);
      return {
        date: state.date,
        ...stateData
      }
    });
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
    console.log(stateHistory)
    setEquipmentStates(eqStates);
  };

  return (
    <>
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
      {equipmentStates.length > 0 &&
        <>
          <h4>Histórico de estados</h4>
          <div style={{display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap"}}>
            {equipmentStates.map((es, index) => {
              return (
                <div key={index} style={{border: `1px solid ${es.color}`, padding: "5px"}}>
                  <p>{es.name}</p>
                  <p>{formatDateToDMY(es.date)}</p>
                </div>
              )
            })}
          </div>
        </>
      }
    </>
  );
};

export default ToolMap;