import { useMemo } from 'react';
import { Polyline, TileLayer, ZoomControl } from 'react-leaflet';

import { CustomMarker } from '../CustomMarker';

import { useEquipment } from '@/hooks';

import { MapProps, MarkerListProps } from './models';

import { MapContainerStyled } from './styles';

export const Map = ({
  equipmentList,
  useEquipmentHook = useEquipment,
  ...rest
}: MapProps) => {
  const {
    getEquipmentPositionHistory,
    getEquipmentStateHistory,
    getIcon,
    equipmentPositionHistory,
  } = useEquipmentHook();

  const centerWithEquipment = useMemo(() => {
    const position = equipmentList
      .map((equipment) =>
        getEquipmentPositionHistory(equipment.id)?.positions?.at(-1)
      )
      .reduce(
        (acc, curr) => {
          if (!curr) return acc;

          return {
            lat: acc.lat + curr.lat,
            lon: acc.lon + curr.lon,
          };
        },
        { lat: 0, lon: 0 }
      );

    return {
      lat: position.lat / equipmentList.length || 0,
      lon: position.lon / equipmentList.length || 0,
    };
  }, [equipmentList, getEquipmentPositionHistory]);

  const markerList: MarkerListProps[] = useMemo(() => {
    if (equipmentPositionHistory.show && equipmentPositionHistory.data) {
      return equipmentPositionHistory.data?.positions?.flatMap((position) => {
        const equipment = equipmentList.find(
          (equipment) => equipment.id === equipmentPositionHistory.equipmentId
        );

        if (!equipment) return [];

        const state = getEquipmentStateHistory(equipment.id)
          ?.states?.filter(
            (state) =>
              new Date(state.date).getTime() <=
              new Date(position.date).getTime()
          )
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )[0];

        if (!state) return [];

        return {
          equipment,
          iconUrl: getIcon({
            equipmentModelId: equipment.equipmentModel?.id || '',
          }),
          position,
          state: state.equipmentState!,
          isEquipmentPositionHistory: true,
        };
      });
    } else {
      return equipmentList.flatMap((equipment) => {
        const position = getEquipmentPositionHistory(
          equipment.id
        )?.positions?.at(-1);
        const state = getEquipmentStateHistory(equipment.id)?.states?.at(
          -1
        )?.equipmentState;

        if (!position || !state) return [];

        return {
          equipment,
          iconUrl: getIcon({
            equipmentModelId: equipment.equipmentModel?.id || '',
          }),
          position,
          state,
        };
      });
    }
  }, [
    equipmentList,
    JSON.stringify(equipmentPositionHistory),
    getEquipmentPositionHistory,
    getEquipmentStateHistory,
    getIcon,
  ]);

  return (
    <MapContainerStyled
      center={[centerWithEquipment.lat, centerWithEquipment.lon]}
      zoom={10}
      zoomControl={false}
      {...rest}
    >
      <ZoomControl position="bottomright" />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markerList.map((props, i) => (
        <CustomMarker key={`${props.equipment.id}-${i}`} {...props} />
      ))}

      {equipmentPositionHistory.show && equipmentPositionHistory.data ? (
        <Polyline
          data-testid="polyline"
          positions={equipmentPositionHistory.data.positions.map((position) => [
            position.lat,
            position.lon,
          ])}
        />
      ) : null}
    </MapContainerStyled>
  );
};
