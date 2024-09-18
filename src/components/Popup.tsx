import React, { useEffect } from 'react';
import { Popup as Pop } from 'react-leaflet';
import { State } from '../types/interfaces';
import { Button, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEquipmentHistory, fetchModel } from '../redux/equipmentSlice';
import { AppDispatch, RootState } from '../redux/store';

interface Props {
  state: State | null;
  equipmentId: string;
  name: string;
  modelId: string;
}

const Popup: React.FC<Props> = ({ state, equipmentId, name, modelId }) => {
  const dispatch: AppDispatch = useDispatch();
  const { model }: any = useSelector((state: RootState) => state.equipment);

  const getModel = (id: string) => {
    dispatch(fetchModel(id));
  };

  useEffect(() => {
    getModel(modelId);
  }, [modelId]);

  const handleOpenHistory = (id: string) => {
    dispatch(fetchEquipmentHistory(id));
  };

  console.log(model);

  return (
    <Pop>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="font-medium">{model.name}</p>
        {state && (
          <Chip
            label={state.name}
            variant="outlined"
            className="mt-2"
            style={{ backgroundColor: `${state.color}`, color: '#FFF' }}
          />
        )}
        <Button onClick={() => handleOpenHistory(equipmentId)}>
          Visualizar histórico
        </Button>
      </div>
    </Pop>
  );
};

export default Popup;
