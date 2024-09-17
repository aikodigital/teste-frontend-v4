//https://www.youtube.com/watch?v=6t73yqu0qOA leaflet lib
import 'leaflet/dist/leaflet.css'; // import this on every leaflet usage
import React, { useContext, useEffect, useState } from 'react';
import MarkerLeaflet from './Marker.leaflet';
import MyContext from '../../context/MyContext';
import { TileLayer, MapContainer } from 'react-leaflet';
import { FilterState } from '../../interfaces/FilterState.interface';
import { EquipmentPropsToLeaflet } from '../../interfaces/EquipmentProps.interface';
import { PositionProps } from '../../interfaces/EquipmentPositionProps.interface';
import Equipments from '../../challenge-info/data/equipment.json';
import StateOptions from '../../challenge-info/data/equipmentState.json';
import StateHistory from '../../challenge-info/data/equipmentStateHistory.json';
import PositionHistory from '../../challenge-info/data/equipmentPositionHistory.json';

function LeafletMap() {
  const [equipments, setEquipments] = useState<EquipmentPropsToLeaflet[]>([]);

  const [initialMapPosition, setInitialMapPosition] = useState<PositionProps>({
    date: '',
    lat: -19.151801,
    lon: -46.007759,
  });

  const {
    search,
    filterByCurrentState,
    setStateOptions,
    isLoading,
    setIsLoading,
  } = useContext(MyContext) as FilterState;

  useEffect(() => {
    if (!equipments.length) return;

    setStateOptions(StateOptions);

    const firstPosition = equipments[0].currentPosition;

    if (firstPosition) {
      setInitialMapPosition(firstPosition);
    }
  }, [equipments]);

  useEffect(() => {
    setIsLoading(true);
    const userDidntSelectAnyFilter = filterByCurrentState === '';

    const equipmentsState = getEquipmentsCurrentState();
    const equipmentsPosition = getEquipmentsCurrentPosition();
    const currentEquipments = formatEquipmentsData(
      equipmentsState,
      equipmentsPosition,
    );

    if (userDidntSelectAnyFilter) {
      setIsLoading(false);
      return setEquipments(currentEquipments);
    }

    const equipmentsFilteredByState = currentEquipments.filter(
      (item) => item.currentState === filterByCurrentState,
    );

    setEquipments(equipmentsFilteredByState);
    setIsLoading(false);
  }, [search, filterByCurrentState]);

  const getEquipmentsCurrentState = () => {
    const equipmentStateHistory = StateHistory;

    const equipmentsState = equipmentStateHistory.map(
      ({ equipmentId, states }) => {
        const lastState = states.length - 1;

        return {
          equipmentId,
          currentState: states[lastState].equipmentStateId,
        };
      },
    );

    return equipmentsState;
  };

  const getEquipmentsCurrentPosition = () => {
    const equipmentPositionHistory = PositionHistory;

    const equipmentsPosition = equipmentPositionHistory.map(
      ({ equipmentId, positions }) => {
        const lastPosition = positions.length - 1;
        return { equipmentId, currentPosition: positions[lastPosition] };
      },
    );

    return equipmentsPosition;
  };

  const formatEquipmentsData = (
    equipmentsState: { equipmentId: string; currentState: string }[],
    equipmentsPosition: {
      equipmentId: string;
      currentPosition: PositionProps;
    }[],
  ) => {
    const currentEquipments = Equipments.map((item) => {
      const currentState = equipmentsState.find(
        (machine) => machine.equipmentId === item.id,
      )?.currentState;

      const currentPosition = equipmentsPosition.find(
        (info) => info.equipmentId === item.id,
      )?.currentPosition;

      return { ...item, currentState, currentPosition };
    });

    return currentEquipments;
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <MapContainer
        zoom={9}
        center={[initialMapPosition.lat, initialMapPosition.lon]}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {equipments.map((item) => {
          const itemInfo = {
            ...item,
            currentState: item.currentState || '',
            currentPosition: item.currentPosition || initialMapPosition,
          };
          return <MarkerLeaflet key={item.id} item={itemInfo} />;
        })}
      </MapContainer>
    </div>
  );
}

export default LeafletMap;
