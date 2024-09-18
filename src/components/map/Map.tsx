import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleMap } from '@react-google-maps/api';
import { fetchEquipments } from '../../store/equipmentThunks';
import { RootState, AppDispatch } from '../../store/store';
import mapStyles from './styles.googlemaps.json';
import CustomMarker from './MapMarkers/CustomMarker';
import styles from './Map.module.scss';
import { EquipmentPositionService } from '../../services/EquipmentPositionService/PositionService';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: -19.2,
  lng: -46.0,
};

interface MapProps {
  selectedEquipment: string | null;
}

const Map: React.FC<MapProps> = ({ selectedEquipment }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  const equipmentData = useSelector(
    (state: RootState) => state.equipment.equipments
  );
  const equipmentStatus = useSelector(
    (state: RootState) => state.equipment.status
  );

  useEffect(() => {
    if (equipmentStatus === 'idle' && equipmentData.length === 0) {
      dispatch(fetchEquipments());
    }
  }, [equipmentStatus, equipmentData, dispatch]);

  useEffect(() => {
    if (selectedEquipment) {
      const equipment = equipmentData.find(
        (e) => e.equipmentId === selectedEquipment
      );
      if (equipment) {
        if (equipment.currentPosition) {
          setMapCenter({
            lat: equipment.currentPosition.lat,
            lng: equipment.currentPosition.lon,
          });
        }

        const PositionService = new EquipmentPositionService();
        PositionService.fetchEquipmentPosition(equipment.equipmentId).then(
          (history) => {
            if (history) {
              const positions = history.positions.map((pos) => ({
                lat: pos.lat,
                lng: pos.lon,
              }));

              if (polylineRef.current) {
                polylineRef.current.setMap(null);
              }

              const newPolyline = new google.maps.Polyline({
                path: positions,
                strokeColor: '#F045455A',
                strokeOpacity: 1.0,
                strokeWeight: 2,
              });
              newPolyline.setMap(mapContainer.current);
              polylineRef.current = newPolyline;
            } else {
              console.error('Erro ao buscar histórico de posições');
            }
          }
        );
      }
    } else {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
    }
  }, [selectedEquipment, equipmentData]);

  const markers = equipmentData
    .filter(
      (equipment) =>
        equipment.currentPosition &&
        equipment.currentPosition.lat &&
        equipment.currentPosition.lon
    )
    .map((equipment) => ({
      id: equipment.equipmentId,
      name: equipment.name,
      position: {
        lat: equipment.currentPosition!.lat,
        lng: equipment.currentPosition!.lon,
      },
      state: equipment.currentState,
      modelId: equipment.equipmentModel,
    }));

  const mapContainer = useRef<google.maps.Map | null>(null);

  return (
    <div className={styles.map}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={10}
        options={{ styles: mapStyles }}
        onLoad={(map) => {
          mapContainer.current = map;
        }}
        onUnmount={() => {
          if (polylineRef.current) {
            polylineRef.current.setMap(null);
          }
        }}
      >
        {markers.map((marker) => (
          <CustomMarker
            key={marker.id}
            position={marker.position}
            onClick={() => {}}
            modelId={marker.modelId}
            stateId={marker.state?.equipmentStateId ?? null}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
