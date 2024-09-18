import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEquipments } from '../redux/equipmentSlice';
import { RootState, AppDispatch } from '../redux/store';
import Map from '../components/Map';
import { Container, Grid, Typography } from '@mui/material';
import History from '../components/History';
import { EquipmentStateHistory } from '../types/interfaces';

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { history, equipments, loading, error } = useSelector(
    (state: RootState) => state.equipment
  );

  useEffect(() => {
    dispatch(fetchEquipments());
  }, [dispatch]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <Container maxWidth={false} className="justify-between flex w-full">
      <Grid className="flex-col justify-center w-full items-center">
        <Typography variant="subtitle1" gutterBottom className="text-white">
          Mapa
        </Typography>
        <Map equipments={equipments || []} />
      </Grid>
      <Grid className="flex justify-center items-start w-full">
        <History history={history as EquipmentStateHistory} />
      </Grid>
    </Container>
  );
};

export default Home;
