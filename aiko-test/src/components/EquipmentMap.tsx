// components/EquipmentMap.tsx

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import StateIndicator from './StateIndicator';
import { useStore } from '../lib/zustand/store';
import { useRouter } from 'next/navigation';

const EquipmentMap: React.FC = () => {
  const router = useRouter()
  const { 
    getEquipmentWithDetails, 
    fetchData, 
    isLoading, 
    selectEquipment
  } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const equipmentsWithDetails = getEquipmentWithDetails();
  
  if (equipmentsWithDetails.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-600">Nenhum equipamento com posição encontrado.</p>
        </div>
      </div>
    );
  }

  // Calculate map center based on equipment positions
  const positions = equipmentsWithDetails.map(e => [e.currentPosition.lat, e.currentPosition.lon]);
  const center = positions.length > 0 
    ? positions[0] as [number, number]
    : [-18.36055796857006, -48.808558360350155] as [number, number];

  const handleHistory = (id: string) => {
    selectEquipment(id)
    router.push('state-history')
  }

  return (
    <div className="h-screen w-full relative">
      <MapContainer 
        center={center}
        zoom={13} 
        style={{ height: '80%', width: '80%', justifySelf: 'center' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {equipmentsWithDetails.map((equipment) => {
          // Create custom icon with state color
          const customIcon = new L.DivIcon({
            className: 'custom-div-icon',
            html: `
              <div style="
                background-color: ${equipment.currentState.color};
                width: 22px;
                height: 22px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 1px 3px rgba(0,0,0,0.4);
              "></div>
            `,
            iconSize: [22, 22],
            iconAnchor: [11, 11],
          });
          
          return (
            <Marker
              key={equipment.equipment.id}
              position={[equipment.currentPosition.lat, equipment.currentPosition.lon]}
              icon={customIcon}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold mb-1">{equipment.equipment.name}</h3>
                  <p className="mb-1">Model: {equipment.model.name}</p>
                  <div className="mb-1">
                    <span className="text-gray-700">Status: </span>
                    <StateIndicator state={equipment.currentState} size="sm" />
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-xs mt-2"
                    onClick={() => handleHistory(equipment.equipment.id)}
                  >
                    See history
                  </button>
                </div>
              </Popup>
            
            </Marker>
          );
        })}
      </MapContainer>
      
      
    </div>
  );
};

export default EquipmentMap;