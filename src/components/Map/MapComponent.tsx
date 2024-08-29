import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setSelectedEquipmentId, resetSearchQuery } from '../../store/equipmentSlice';

// Services
import { getMarkers } from '../../services/MapService';

// Styles
import styles from './MapComponent.module.css';
import 'leaflet/dist/leaflet.css';

// images
import truck from '../../assets/img/truck.png';
import selectedTruck from '../../assets/img/selected-truck.png';
import harvester from '../../assets/img/harvester.png';
import selectedHarvester from '../../assets/img/selected-harvester.png';
import claw from '../../assets/img/claw.png';
import selectedClaw from '../../assets/img/selected-claw.png';
import pointIcon from '../../assets/img/point.png';
import selectedPointIcon from '../../assets/img/selected-point.png';

const iconMap: { [modelName: string]: { default: L.Icon, selected: L.Icon } } = {
  'a3540227-2f0e-4362-9517-92f41dabbfdf': {
    default: new L.Icon({ iconUrl: truck, iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] }),
    selected: new L.Icon({ iconUrl: selectedTruck, iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] })
  },
  'a4b0c114-acd8-4151-9449-7d12ab9bf40f': {
    default: new L.Icon({ iconUrl: harvester, iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] }),
    selected: new L.Icon({ iconUrl: selectedHarvester, iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] })
  },
  '9c3d009e-0d42-4a6e-9036-193e9bca3199': {
    default: new L.Icon({ iconUrl: claw, iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] }),
    selected: new L.Icon({ iconUrl: selectedClaw, iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] })
  },
  'Modelo Desconhecido': {
    default: new L.Icon({ iconUrl: pointIcon, iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] }),
    selected: new L.Icon({ iconUrl: selectedPointIcon, iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32] })
  },
};

const Map = () => {
  const dispatch = useDispatch();
  const selectedEquipmentId = useSelector((state: RootState) => state.equipment.selectedEquipmentId);
  const data = getMarkers();

  const mapCenter: LatLngExpression = [data[0].lat, data[0].lng];

  const handleMarkerClick = (equipmentId: string) => {
    dispatch(setSelectedEquipmentId(equipmentId));
    dispatch(resetSearchQuery());
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: () => {
        dispatch(setSelectedEquipmentId(null));
      }
    });
    return null;
  };

  return (
    <MapContainer center={mapCenter} zoom={11} className={`${styles.MapContainer}`}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler />
      {data.map((marker, index) => {
        const markerIcons = iconMap[marker.model] || iconMap['Modelo Desconhecido'];
        const markerIcon = selectedEquipmentId === marker.id ? markerIcons.selected : markerIcons.default;

        return (
          <Marker
            key={index}
            position={[marker.lat, marker.lng] as LatLngExpression}
            icon={markerIcon}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
              },
              mouseout: (e) => {
                e.target.closePopup();
              },
              click: () => {
                handleMarkerClick(marker.id);
              }
            }}
          >
            <Popup>
              <div>
                <h3 className='h6 mb-2'>{marker.title}</h3>
                <p className='p-0 m-0'>Status: {marker.state}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
