import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import equipments from '../mocks/equipment.json';
import model from '../mocks/equipmentModel.json';
import position from '../mocks/equipmentPositionHistory.json';
import state from '../mocks/equipmentState.json';
import stateHistory from '../mocks/equipmentStateHistory.json';
import { setEquipmentModels } from '../redux/reducers/equipment-model.reducer';
import { setEquipmentPositionHistory } from '../redux/reducers/equipment-position-history.reducer';
import { setEquipmentStateHistory } from '../redux/reducers/equipment-state-history.reducer';
import { setEquipmentState } from '../redux/reducers/equipment-state.reducer';
import { setEquipments } from '../redux/reducers/equipment.reducer';

export const useInitializeApplicationHook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEquipments(equipments));
    dispatch(setEquipmentModels(model));
    dispatch(setEquipmentPositionHistory(position));
    dispatch(setEquipmentState(state));
    dispatch(setEquipmentStateHistory(stateHistory));
  }, [dispatch]);
};
