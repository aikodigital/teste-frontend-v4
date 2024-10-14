import React from 'react';
import { Card, Typography, Grid, Box } from '@mui/material';
import { useStatistics } from '../../contexts/StatisticsContext';

const StatisticsCards: React.FC = () => {
  const { values } = useStatistics();

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Média Geral de Frequência</Typography>
            <Typography variant="h4">{values.mediaFrequency?.toFixed(2)}%</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Quantidade Total de Alunos</Typography>
            <Typography variant="h4">{values.totalStudents}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ p: 2 }}>
            <Typography variant="caption">Média Geral de Notas</Typography>
            <Typography variant="h5">{values.mediaGradedStudent?.toFixed(2)}</Typography>
          </Card>
        </Grid>
        {values.mediaPorClassRoom?.map((item) => (
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ p: 2 }}>
              <Typography variant="caption">Nota média de {item.classroomName}</Typography>
              <Typography variant="h5">{item.mediaGradedStudent?.toFixed(2) ?? "--"}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatisticsCards;