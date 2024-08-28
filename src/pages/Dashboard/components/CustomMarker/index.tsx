import { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

import { Badge, Button } from '@/components';

import { useEquipment } from '@/hooks';

import { CustomMarkerProps } from './models';

import {
  CustomMarkerContainerStyled,
  CustomMarkerContentStyled,
  CustomMarkerHeaderStyled,
  CustomMarkerIconStyled,
  CustomMarkerTextsStyled,
} from './styles';

export const CustomMarker = ({
  equipment,
  iconUrl,
  position,
  state,
  isEquipmentPositionHistory,
  useEquipmentHook = useEquipment,
}: CustomMarkerProps) => {
  const map = useMap();
  const { getIcon } = useEquipmentHook();

  const handleOpenEquipmentAccordion = (id: string) => {
    const accordionTrigger = document.getElementById(`accordion-trigger-${id}`);
    const accordionIsOpen =
      accordionTrigger?.getAttribute('data-state') === 'open';

    if (accordionTrigger) {
      accordionTrigger.click();

      if (accordionTrigger.scrollIntoView && !accordionIsOpen) {
        setTimeout(() => {
          accordionTrigger.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 300);
      }
    }
  };

  useEffect(() => {
    map.closePopup();
  }, [isEquipmentPositionHistory, map]);

  return (
    <Marker
      position={[position.lat, position.lon]}
      icon={L.icon({
        iconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
        className: 'custom-marker-icon',
      })}
    >
      <Popup>
        <CustomMarkerContainerStyled>
          <CustomMarkerHeaderStyled>
            <div className="info">
              <CustomMarkerIconStyled
                src={getIcon({
                  equipmentModelId: equipment.equipmentModel?.id || '',
                })}
                alt="Equipment"
              />

              <CustomMarkerTextsStyled>
                <h3>{equipment.name}</h3>
                <span>{equipment.equipmentModel?.name}</span>
              </CustomMarkerTextsStyled>
            </div>

            <div className="status">
              <Badge color={state?.color}>{state?.name}</Badge>
            </div>
          </CustomMarkerHeaderStyled>

          <hr />

          <CustomMarkerContentStyled>
            <span>
              <strong>
                {isEquipmentPositionHistory ? 'Data: ' : 'Última atualização: '}
              </strong>
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
          </CustomMarkerContentStyled>

          {!isEquipmentPositionHistory ? (
            <>
              <hr />

              <Button
                data-testid="button-open-accordion"
                id={`button-open-accordion-${equipment.id}`}
                onClick={() => handleOpenEquipmentAccordion(equipment.id)}
              >
                Histórico de estados
              </Button>
            </>
          ) : null}
        </CustomMarkerContainerStyled>
      </Popup>
    </Marker>
  );
};
