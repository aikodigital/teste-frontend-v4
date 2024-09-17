import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const EquipmentMarker = ({ equipment, position }) => {
  const [equipmentState, setEquipmentState] = useState('');

  // Carregar o estado atual do equipamento
  useEffect(() => {
    import('../data/equipmentStateHistory.json').then((data) => {
      const equipmentHistory = data.default.find(item => item.equipmentId === equipment.id);
      if (equipmentHistory) {
        const latestState = equipmentHistory.states.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        import('../data/equipmentState.json').then((stateData) => {
          const state = stateData.default.find(s => s.id === latestState.equipmentStateId);
          if (state) setEquipmentState(state.name);
        });
      }
    });
  }, [equipment.id]);

  return (
    <Marker position={position} icon={L.icon({ iconUrl: '/marker-icon.png' })}>
      <Popup>
        <div>
          <strong>{equipment.name}</strong><br />
          Estado: {equipmentState}
        </div>
      </Popup>
    </Marker>
  );
};

export default EquipmentMarker;
