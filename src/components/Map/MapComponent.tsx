import { useEquipmentPositionHistory, useEquipmentState, useEquipmentStateHistory } from '@/hooks';
import { useMap } from '@/hooks/useMap';

export const MapComponent = () => {
  const { data: positions } = useEquipmentPositionHistory();
  const { data: stateHistory } = useEquipmentStateHistory();
  const { data: states } = useEquipmentState();
  const stateNames = states?.reduce(
    (acc, state) => {
      acc[state.id] = state.name;
      return acc;
    },
    {} as Record<string, string>
  );
  const markers = positions
    ? Object.keys(positions)
        .map((equipmentId) => {
          const equipmentPositionHistory = positions[equipmentId];
          const equipmentStateHistory = stateHistory?.[equipmentId];
          const equipmentCurrentStateId =
            equipmentStateHistory?.states?.[equipmentStateHistory.states.length - 1]
              ?.equipmentStateId;
          const equipmentCurrentState = equipmentCurrentStateId
            ? (stateNames?.[equipmentCurrentStateId] ?? 'Desconhecido')
            : 'Desconhecido';

          if (
            equipmentPositionHistory &&
            Array.isArray(equipmentPositionHistory.positions) &&
            equipmentPositionHistory.positions.length > 0
          ) {
            const firstPosition = equipmentPositionHistory.positions[0];

            if (firstPosition) {
              return {
                coordinates: [firstPosition.lat, firstPosition.lon] as [number, number],
                popupValue: `Equipamento: ${equipmentId}\n
                  Estado Atual: ${equipmentCurrentState}\n
                  Histórico de Estados: ${
                    equipmentStateHistory?.states
                      ?.map((state) => stateNames?.[state.equipmentStateId] ?? 'Desconhecido')
                      ?.join(', ') ?? 'Nenhum histórico disponível'
                  }`,
                tooltipValue: `Posição atual: ${String(firstPosition.lat)}, ${String(firstPosition.lon)}`
              };
            }
          }

          return null;
        })
        .filter((marker): marker is NonNullable<typeof marker> => marker !== null)
    : [];

  useMap({ zoom: 10, center: [-19.1673, -46.0034], markers });
  return <div id="map" style={{ height: '700px', width: '100vw' }} />;
};
