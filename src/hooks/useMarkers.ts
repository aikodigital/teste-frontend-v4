import { useEquipmentPositionHistory } from '@/hooks';

const useMarkers = () => {
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

  return markers;
};

export { useMarkers };
