import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EquipmentPopup = ({ equipmentId }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    axios.get(`/data/equipmentStateHistory.json`)
      .then(response => {
        const equipmentData = response.data.find(e => e.equipmentId === equipmentId);
        if (equipmentData) {
          const latestStateId = equipmentData.states[0].equipmentStateId;
          return axios.get(`/data/equipmentState.json`)
            .then(stateResponse => {
              const latestState = stateResponse.data.find(s => s.id === latestStateId);
              setState(latestState);
            });
        }
      })
      .catch(error => console.error('Error fetching equipment state:', error));
  }, [equipmentId]);

  if (!state) return <div>Loading...</div>;

  return (
    <div>
      <h4>Estado Atual: {state.name}</h4>
      <div style={{ backgroundColor: state.color, width: '100%', height: '20px' }}></div>
    </div>
  );
};

export default EquipmentPopup;
