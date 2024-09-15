import { useEquipmentPositionHistory } from '@/hooks';
import { useMap } from '@/hooks/useMap';

import { EquipmentDetails } from '../Equipment/EquipmentDetails';

export const MapComponent = () => {
  const { data: positions } = useEquipmentPositionHistory();

  const markers = positions
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
                popupValue: `<div><strong>Equipamento: ${equipmentId}</strong></div>`,
                tooltipValue: `Posição atual: ${String(firstPosition.lat)}, ${String(firstPosition.lon)}`,
                equipmentId
              };
            }
          }

          return null;
        })
        .filter((marker): marker is NonNullable<typeof marker> => marker !== null)
    : [];

  useMap({ zoom: 10, center: [-19.1673, -46.0034], markers });

  return (
    <div>
      <div id="map" style={{ height: '700px', width: '100vw' }} />
      {markers.length > 0 && markers[0]?.equipmentId && (
        <EquipmentDetails equipmentId={markers[0].equipmentId} />
      )}
    </div>
  );
};
