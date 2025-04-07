import { useEffect, useRef, useState } from 'react';
import loadGoogleMapsScript from '../utils/loadGoogleMapsScript';  
import { EquipmentDetail } from '@/types/equipment';
import EquipmentHistory from './EquipmentHistory';
import { Box } from '@mui/material';
import EquipmentFilter from './EquipmentFilters';

const MapView = ({ equipmentList }: { equipmentList: EquipmentDetail[] }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [filteredEquipment, setFilteredEquipment] = useState<EquipmentDetail[]>([]);

  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentDetail | null>(null);

  const getEmojiByModel = (modelName: string): string => {
    if (modelName.includes('Caminhão')) return '🚛';
    if (modelName.includes('Harvester')) return '🌾';
    return '🔧';
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .gm-style-iw button.gm-ui-hover-effect {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    let filtered = equipmentList;

    if (selectedModel) {
      filtered = filtered.filter((eq) => eq.model.name === selectedModel);
    }

    if (selectedState) {
      filtered = filtered.filter((eq) => eq.currentState.name === selectedState);
    }

    setFilteredEquipment(filtered);
  }, [selectedModel, selectedState, equipmentList]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Chave da API do Google Maps não está definida!');
      return;
    }

    loadGoogleMapsScript(apiKey);

    const interval = setInterval(() => {
      if (window.google && window.google.maps && mapRef.current) {
        clearInterval(interval);

        const map = new google.maps.Map(mapRef.current, {
          center: { lat: -15.7797, lng: -47.9297 },
          zoom: 5,
          mapId: import.meta.env.VITE_GOOGLE_MAP_ID as string,
        });

        const infoWindow = new google.maps.InfoWindow();
        
        filteredEquipment.forEach((equipment) => {
          if (!equipment.currentPosition) return;

          const position = {
            lat: equipment.currentPosition.lat,
            lng: equipment.currentPosition.lon,
          };

          const emoji = getEmojiByModel(equipment.model.name);

          const marker = new google.maps.Marker({
            map,  
            position,
            title: equipment.name,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="rgba(30, 136, 229, 0.6)" />
                  <text x="24" y="26" font-size="20" text-anchor="middle" dominant-baseline="middle">
                    ${emoji}
                  </text>
                </svg>
              `),
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 40),
            },
          });

          marker.addListener('click', () => {
            setSelectedEquipment(equipment);
          });

          marker.addListener('mouseover', () => {
            infoWindow.setContent(`
              <div style="
                font-family: Roboto, sans-serif;
                padding: 12px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.15);
                font-size: 13px;
                max-width: 250px;
                background-color: white;
              ">
                <div style="font-weight: 600; font-size: 15px; color: #1976d2; margin-bottom: 6px;">
                  ${equipment.name}
                </div>
                <div><strong>Modelo:</strong> ${equipment.model.name}</div>
                <div><strong>Estado:</strong> ${equipment.currentState.name}</div>
                <div style="margin-top: 6px; color: #666;">
                  <small>Última atualização:</small><br/>
                  <small>${new Date(equipment.currentPosition.date).toLocaleString()}</small>
                </div>
              </div>
            `);
            
            infoWindow.open(map, marker);
          });

          marker.addListener('mouseout', () => {
            infoWindow.close();
          });
        });
      }
    }, 500);
  }, [filteredEquipment]);
  
  return (
    <Box sx={{ display: 'flex', height: '80vh', p: 2, gap: 2 }}>
      <Box
        ref={mapRef}
        sx={{
          flex: 1,
          borderRadius: 2,
          boxShadow: 3,
          overflow: 'hidden',
        }}
      />
      <Box
        sx={{
          width: '35%',
          maxWidth: 500,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
       {selectedEquipment ? (
          <EquipmentHistory
            equipment={selectedEquipment}
            onClose={() => setSelectedEquipment(null)}
          />
        ) : (
          <EquipmentFilter
            equipmentList={filteredEquipment}
            selectedModel={selectedModel}
            selectedState={selectedState}
            setSelectedModel={setSelectedModel}
            setSelectedState={setSelectedState}
          />
        )}
      </Box>
    </Box>
  );
};

export default MapView;
