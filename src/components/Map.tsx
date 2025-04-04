import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { EquipmentWithDetails } from '../types';
import { useState } from 'react';
import { Paper, Typography, Box, styled } from '@mui/material';
import { format } from 'date-fns';
import { getStateName, getStateColor } from '../services/states';

interface MapProps {
  equipments: EquipmentWithDetails[];
  selectedEquipment: EquipmentWithDetails | null;
  onSelectEquipment: (equipment: EquipmentWithDetails) => void;
}

const StateIndicator = styled(Box)<{ color: string }>(({ color }) => ({
  padding: '4px 12px',
  borderRadius: '16px',
  backgroundColor: color,
  color: '#ffffff',
  fontSize: '0.875rem',
  fontWeight: 500,
  display: 'inline-block',
}));

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -19.151801,
  lng: -46.007759,
};

export const Map = ({ equipments, selectedEquipment, onSelectEquipment }: MapProps) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        {equipments.map((equipment) => (
          <Marker
            key={equipment.id}
            position={{
              lat: equipment.currentPosition.lat,
              lng: equipment.currentPosition.lon
            }}
            onClick={() => {
              onSelectEquipment(equipment);
              setShowInfo(true);
            }}
          />
        ))}

        {selectedEquipment && showInfo && (
          <InfoWindow
            position={{
              lat: selectedEquipment.currentPosition.lat,
              lng: selectedEquipment.currentPosition.lon
            }}
            onCloseClick={() => setShowInfo(false)}
          >
            <Paper sx={{ p: 2, maxWidth: 300 }}>
              <Typography variant="h6">{selectedEquipment.name}</Typography>
              <Box sx={{ mt: 1, mb: 2 }}>
                <StateIndicator color={getStateColor(selectedEquipment.currentState.color)}>
                  {getStateName(selectedEquipment.currentState.id)}
                </StateIndicator>
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                Histórico de Estados
              </Typography>
              {selectedEquipment.stateHistory.map((state, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1 
                  }}
                >
                  <StateIndicator color={getStateColor(state.equipmentStateId)}>
                    {getStateName(state.equipmentStateId)}
                  </StateIndicator>
                  <Typography variant="caption">
                    {format(new Date(state.date), 'dd/MM/yyyy HH:mm')}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};