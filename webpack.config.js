import React, { useState } from 'react';
import { loadData } from '../utils/dataLoader';
import { Marker, Popup } from 'react-leaflet';

const EquipmentMarker = ({ equipment }) => {
  const {
    equipmentPositionHistoryData,
    equipmentStateData,
    equipmentStateHistoryData,
  } = loadData();

  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const getLatestPosition = (positions) => {
    return positions.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    });
  };

  const getEquipmentState = (equipmentId) => {
    const history = equipmentStateHistoryData.find(
      (e) => e.equipmentId === equipmentId
    );
    const latestStateId = history.states.reduce((latest, current) => {
      return new Date(current.date) > new Date(latest.date) ? current : latest;
    }).equipmentStateId;
    return equipmentStateData.find((state) => state.id === latestStateId);
  };

  const handleClick = (equipmentId) => {
    setSelectedEquipment(equipmentId);
  };

  return (
    <>
      {equipmentPositionHistoryData.map((posHistory) => {
        const latestPosition = getLatestPosition(posHistory.positions);
        const equipmentState = getEquipmentState(posHistory.equipmentId);
        return (
          <Marker
            key={posHistory.equipmentId}
            position={[latestPosition.lat, latestPosition.lon]}
            eventHandlers={{
              click: () => handleClick(posHistory.equipmentId),
            }}
          >
            <Popup>
              <strong>{equipment.name}</strong><br />
              Estado: <span style={{ color: equipmentState.color }}>{equipmentState.name}</span><br />
              {selectedEquipment === posHistory.equipmentId && (
                <>
                  <h4>Histórico de Estados</h4>
                  <ul>
                    {equipmentStateHistoryData
                      .find((e) => e.equipmentId === selectedEquipment)
                      .states.map((state, index) => (
                        <li key={index}>
                          {new Date(state.date).toLocaleString()}:{" "}
                          {equipmentStateData.find(
                            (es) => es.id === state.equipmentStateId
                          ).name}
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default EquipmentMarker;
