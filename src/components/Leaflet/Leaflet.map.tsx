import MyContext from '../../context/MyContext';
import React, { useContext, useEffect, useState } from 'react';

//https://www.youtube.com/watch?v=6t73yqu0qOA leaflet lib
import 'leaflet/dist/leaflet.css'; // import this on every leaflet usage

import MarkerLeaflet from './Marker.leaflet';
import { TileLayer, MapContainer } from 'react-leaflet';

import StateOptions from '../../challenge-info/data/equipmentState.json';

import { FilterState } from '../../interfaces/FilterState.interface';
import { PositionProps } from '../../interfaces/EquipmentPositionProps.interface';
import { EquipmentPropsToLeaflet } from '../../interfaces/EquipmentProps.interface';

import { formatEquipmentsData } from '../../helpers/format.equipments.data';
import { getEquipmentsCurrentState } from '../../helpers/get.equipments.current.state';
import { getEquipmentsCurrentPosition } from '../../helpers/get.equipments.current.position';

function LeafletMap() {
  const {
    search,
    filterByCurrentState,
    setStateOptions,
    isLoading,
    setIsLoading,
  } = useContext(MyContext) as FilterState;

  const [equipments, setEquipments] = useState<EquipmentPropsToLeaflet[]>([]);

  const [initialMapPosition, setInitialMapPosition] = useState<PositionProps>({
    date: '',
    lat: -19.151801,
    lon: -46.007759,
  });

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
      search,
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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="py-10 flex justify-center">
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
