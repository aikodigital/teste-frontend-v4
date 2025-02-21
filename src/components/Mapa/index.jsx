import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';

function getLastPosition(positions) {
  if (!positions || positions.length === 0) return null;
  const sorted = [...positions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return sorted[sorted.length - 1];
}

const MapComponent = ({
  equipmentPositions,
  onMarkerClick,
  getEquipmentStatePopup,
}) => {
  return (
    <MapContainer
      center={[-19.126536, -45.947756]}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {equipmentPositions.map((equipment, index) => {
        const lastPos = getLastPosition(equipment.positions);
        if (!lastPos) return null;
        return (
          <Marker
            key={equipment.equipmentId || index}
            position={[lastPos.lat, lastPos.lon]}
            eventHandlers={{
              click: () => {
                console.log('Marker foi clicado!', equipment);
                onMarkerClick(equipment);
              },
              mouseover: (e) => e.target.openPopup(),
              mouseout: (e) => e.target.closePopup(),
            }}
          >
            <Popup>
              <strong>Nome:</strong> {equipment.name || 'Sem nome'} <br />
              <strong>ID:</strong> {equipment.equipmentId} <br />
              <strong>Status:</strong>{' '}
              {getEquipmentStatePopup
                ? getEquipmentStatePopup(equipment.equipmentId)
                : '???'}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

MapComponent.propTypes = {
  equipmentPositions: PropTypes.array.isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  getEquipmentStatePopup: PropTypes.func,
};

export default MapComponent;
