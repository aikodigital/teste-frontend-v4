import { useCallback, useMemo } from 'react';
import { Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import L from 'leaflet';

import GarraTracadora from '@/assets/images/garra-tracadora.jpg';
import Harvester from '@/assets/images/harvester.jpg';
import CaminhaoCarga from '@/assets/images/caminhao-de-carga.jpg';

import { Badge } from '@/components';

import { useProcessData } from '@/hooks';

import { MapProps } from './models';

import {
  MapContainerStyled,
  MapPopupContainerStyled,
  MapPopupContentStyled,
  MapPopupHeaderStyled,
  MapPopupIconStyled,
  MapPopupTextsStyled,
} from './styles';

export const Map = ({
  equipmentList,
  useProcessDataHook = useProcessData,
  ...rest
}: MapProps) => {
  const { getEquipmentPositionHistory, getEquipmentStateHistory } =
    useProcessDataHook();

  const getIcon = (id: string) => {
    switch (id) {
      case '9c3d009e-0d42-4a6e-9036-193e9bca3199':
        return GarraTracadora;
      case 'a4b0c114-acd8-4151-9449-7d12ab9bf40f':
        return Harvester;
      case 'a3540227-2f0e-4362-9517-92f41dabbfdf':
        return CaminhaoCarga;
      default:
        return;
    }
  };

  const getLatestState = (id: string) => {
    return getEquipmentStateHistory(id)
      ?.states?.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      ?.at(-1)?.equipmentState;
  };

  const getLatestPosition = useCallback(
    (id: string) => {
      return getEquipmentPositionHistory(id)
        ?.positions?.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        ?.at(-1);
    },
    [getEquipmentPositionHistory]
  );

  const centerWithEquipment = useMemo(() => {
    const position = equipmentList
      .map((equipment) => getLatestPosition(equipment.id))
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
      lat: position.lat / equipmentList.length,
      lon: position.lon / equipmentList.length,
    };
  }, [equipmentList, getLatestPosition]);

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

      {equipmentList.map((equipment) => {
        const position = getLatestPosition(equipment.id);
        const state = getLatestState(equipment.id);

        if (!position || !state) return null;

        return (
          <Marker
            key={equipment.id}
            position={[position.lat, position.lon]}
            icon={L.icon({
              iconUrl: getIcon(equipment.equipmentModel?.id || '') || '',
              iconSize: [32, 32],
              iconAnchor: [16, 16],
              popupAnchor: [0, -16],
              className: 'custom-marker-icon',
            })}
          >
            <Popup>
              <MapPopupContainerStyled>
                <MapPopupHeaderStyled>
                  <div className="info">
                    <MapPopupIconStyled
                      src={getIcon(equipment.equipmentModel?.id || '')}
                      alt="Equipment"
                    />

                    <MapPopupTextsStyled>
                      <h3>{equipment.name}</h3>
                      <span>{equipment.equipmentModel?.name}</span>
                    </MapPopupTextsStyled>
                  </div>

                  <div className="status">
                    <Badge color={state?.color}>{state?.name}</Badge>
                  </div>
                </MapPopupHeaderStyled>

                <hr />

                <MapPopupContentStyled>
                  <span>
                    <strong>Última atualização: </strong>
                    {new Date(position.date).toLocaleString()}
                  </span>

                  <span>
                    <strong>Latitude: </strong>
                    {position.lat}
                  </span>

                  <span>
                    <strong>Longitude: </strong>
                    {position.lon}
                  </span>
                </MapPopupContentStyled>
              </MapPopupContainerStyled>
            </Popup>
          </Marker>
        );
      })}
    </MapContainerStyled>
  );
};
