import { useEffect, useState, useMemo } from 'react';
import { Marker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { IEquipmentPositionHistory } from '@/zustand/interface';
import { last } from 'lodash';
import { useStore } from 'zustand';
import useEquipmentStore from '@/zustand';
import { MARKERS } from './create-icon';
import useIsVisible from '@/hooks/useIsVisible';
import Modal from './modal';

interface EquipmentMarkerProps {
  activeId: string;
  equipmentId: string;
  lat?: number;
  lon?: number;
  date?: string | Date;
  equipmentPositions: IEquipmentPositionHistory[];
}

const EquipmentMarker: React.FC<EquipmentMarkerProps> = ({
  activeId,
  equipmentId,
  lat,
  lon,
  date,
  equipmentPositions
}) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const { show, isVisible, hide } = useIsVisible();
  const map = useMap();
  const { equipmentStateHistory, equipmentState, equipments, equipmentModel } =
    useStore(useEquipmentStore);
  const stateHistory = equipmentStateHistory.find(
    state => state.equipmentId === equipmentId
  );
  const equipment = equipments.find(equipment => equipment.id === equipmentId);
  const model = equipmentModel.find(
    item => item.id === equipment?.equipmentModelId
  );
  const equipmentHistory = useMemo(
    () => equipmentStateHistory.find(item => item.equipmentId === equipmentId),
    [equipmentStateHistory, equipmentId]
  );
  const lastState = last(equipmentHistory?.states);
  const getState = equipmentState.find(
    item => item.id === lastState?.equipmentStateId
  );
  const markerIcon = useMemo(() => {
    return MARKERS[getState?.name as keyof typeof MARKERS];
  }, [getState]);

  useEffect(() => {
    if (activeId !== equipmentId) return;

    const equipment = equipmentPositions.find(
      item => item.equipmentId === activeId
    );
    const newPosition = last(equipment?.positions);

    if (!newPosition?.lat || !newPosition?.lon) return;

    setPosition([newPosition.lat, newPosition.lon]);
    map.flyTo([newPosition.lat, newPosition.lon], 12);
  }, [activeId, equipmentId, equipmentPositions, map]);

  return (
    <>
      {position && date && (
        <Marker
          position={position}
          icon={markerIcon}
          eventHandlers={{
            click: () => {
              show();
            }
          }}
        >
          <Tooltip>
            <div>
              <p className={`text-[${getState?.color}]`}>{getState?.name}</p>
              <p>{new Date(date).toLocaleString()}</p>
            </div>
          </Tooltip>
        </Marker>
      )}
      {lat !== undefined && lon !== undefined && (
        <Marker
          position={[lat, lon]}
          icon={markerIcon}
          eventHandlers={{
            click: () => {
              show();
            }
          }}
        >
          {date && (
            <Tooltip>
              <div>
                <p className={`text-[${getState?.color}]`}>{getState?.name}</p>
                <p>{new Date(date).toLocaleString()}</p>
              </div>
            </Tooltip>
          )}
        </Marker>
      )}
      <Modal
        isVisible={isVisible}
        hide={hide}
        stateDefinitions={equipmentState}
        states={stateHistory?.states}
        equipmentName={`${equipment?.name} - ${model?.name}`}
        equipmentId={equipmentId}
      />
    </>
  );
};
export default EquipmentMarker;
