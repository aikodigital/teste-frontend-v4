import EquipmentPositionHistory from '../../data/equipmentPositionHistory.json';
import { getLastPositionPerEquipment } from '../../helpers/getLastPositionPerEquipment';
import { getEquipmentName } from '../../helpers/getEquipmentName';
import { getEquipmentCurrentState } from '../../helpers/getEquipmentCurrentState';
import { getLastThreeStatesPerEquipment } from '../../helpers/getLastThreeStatesPerEquipment';
import { getStateObj } from '../../helpers/getStateObj';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import './styles.css';

export default function Map() {
  const [showStateHistory, setShowStateHistory] = useState(false);
  return (
    <MapContainer
      className="map"
      center={[-19.126536, -45.947756]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {EquipmentPositionHistory.map((positionedEquipment, index) => {
        // console.log('equipamento object: ', positionedEquipment.equipmentId);
        return (
          <Marker
            key={index}
            position={getLastPositionPerEquipment(
              positionedEquipment.positions,
            )}
            // icon={}
          >
            <Popup>
              <div className="popup-info-container">
                <span>
                  <b>Nome:</b>{' '}
                  {getEquipmentName(positionedEquipment.equipmentId)}
                </span>
                <span>
                  <b>Status:</b>{' '}
                  {
                    getEquipmentCurrentState(positionedEquipment.equipmentId)
                      .name
                  }
                </span>
              </div>
              <button
                id="state-history-button"
                onClick={() => setShowStateHistory(!showStateHistory)}
              >
                <i>Histórico de estados</i>
              </button>
              {showStateHistory && (
                <div className="state-history-container" key={index}>
                  {getLastThreeStatesPerEquipment(
                    positionedEquipment.equipmentId,
                  ).map((equipmentState, key) => {
                    console.log('equipmentState: ', equipmentState);
                    return (
                      <span key={key}>
                        {getStateObj(equipmentState.equipmentStateId).name}, em{' '}
                        {equipmentState.date.slice(0, 10)}
                      </span>
                    );
                  })}
                </div>
              )}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
