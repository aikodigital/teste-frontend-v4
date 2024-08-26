import equipmentData from '../../data/equipment.json';
import equipmentModelData from '../../data/equipmentModel.json';
import equipmentPositionHistoryData from '../../data/equipmentPositionHistory.json';
import equipmentStateData from '../../data/equipmentState.json';
import equipmentStateHistoryData from '../../data/equipmentStateHistory.json';

import { MapContainer, TileLayer } from 'react-leaflet';

import { useEffect, useState } from 'react';

import 'leaflet/dist/leaflet.css';
import './index.css';

import Marker from '../Marker/Marker';

interface FilteredDataProps {
  id: string;
  name: string | undefined;
  model: string | undefined;
  position: [number, number] | undefined;
  state: string | undefined;
}

const Map = () => {
  const [data, setData] = useState<Array<FilteredDataProps>>([]);

  const getData = () => {
    const data = equipmentData.map((equipment) => {
      const model = equipmentModelData.find(
        (equipmentModel) => equipmentModel.id === equipment.equipmentModelId
      );

      const stateObj = equipmentStateHistoryData
        .find((state) => state.equipmentId === equipment.id)
        ?.states.at(-1);

      const state = equipmentStateData.find(
        (equipmentState) => equipmentState.id === stateObj?.equipmentStateId
      );

      const positionObj = equipmentPositionHistoryData
        .find((position) => position.equipmentId === equipment.id)
        ?.positions.at(-1);

      return {
        id: equipment.id,
        name: equipment.name,
        model: model?.name,
        position: [positionObj?.lat ?? 0, positionObj?.lon ?? 0] as [
          number,
          number
        ],
        state: state?.name,
      };
    });

    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <MapContainer center={[-19.126536, -45.947756]} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {data.map((marker) => {
          return <Marker {...marker} />;
        })}
      </MapContainer>
    </>
  );
};

export default Map;
