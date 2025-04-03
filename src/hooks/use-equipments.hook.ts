import { useSelector } from 'react-redux';
import { ReduxState } from '../redux/store';

export const useEquipmentsHook = () => {
  const { equipments, position, stateHistory, state } = useSelector(
    (state: ReduxState) => state
  );

  const data = equipments.data.map((equipment) => {
    const equipmentPosition = position.data.find(
      (item) => item.equipmentId === equipment.id
    );

    const current = state.data.find(
      (item) =>
        item.id ===
        stateHistory.data.find((item) => item.equipmentId === equipment.id)
          ?.states[0].equipmentStateId
    );

    return {
      ...equipment,
      position: equipmentPosition?.positions ?? [],
      state: current,
    };
  });

  return {
    data,
  };
};
