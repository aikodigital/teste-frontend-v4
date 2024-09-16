import { renderToString } from 'react-dom/server';

import { EquipmentDetails } from '@/components';
import {
  useEquipmentModels,
  useEquipmentPositionHistory,
  useEquipmentState,
  useEquipmentStateHistory,
  useEquipments
} from '@/hooks';

const useMarkers = () => {
  const { data: positions } = useEquipmentPositionHistory();
  const { data: stateHistory } = useEquipmentStateHistory();
  const { data: states } = useEquipmentState();
  const { data: equipments } = useEquipments();
  const { data: equipmentModels } = useEquipmentModels();

  const markers =
    positions && stateHistory && states && equipments && equipmentModels
      ? Object.keys(positions)
          .map((equipmentId) => {
            const equipmentPositionHistory = positions[equipmentId];

            if (
              equipmentPositionHistory &&
              Array.isArray(equipmentPositionHistory.positions) &&
              equipmentPositionHistory.positions.length > 0
            ) {
              const firstPosition = equipmentPositionHistory.positions[0];

              if (firstPosition) {
                return {
                  coordinates: [firstPosition.lat, firstPosition.lon] as [number, number],
                  popupValue: renderToString(
                    <EquipmentDetails
                      equipmentId={equipmentId}
                      stateHistory={stateHistory}
                      states={states}
                      equipments={equipments}
                      equipmentModels={equipmentModels}
                    />
                  ),
                  tooltipValue: `Posição atual: ${String(firstPosition.lat)}, ${String(firstPosition.lon)}`
                };
              }
            }

            return null;
          })
          .filter((marker): marker is NonNullable<typeof marker> => marker !== null)
      : [];

  return markers;
};

export { useMarkers };
