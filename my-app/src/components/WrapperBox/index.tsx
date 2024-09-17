import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { TableProps } from '@/app/map/[id]/page';

type WrapperBoxProps = {
  dataTable: TableProps;
};

const WrapperBox: React.FC<WrapperBoxProps> = ({ dataTable }) => {
  const { overallResult } = dataTable;

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} sx={{ padding: 2, borderRadius: 2, backgroundColor: '#EEEFEF', textAlign: 'center' }}>
            <Typography variant="h6" component="div">
              Nome
            </Typography>
            <Typography variant="body1">
              {overallResult.name}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} sx={{ padding: 2, borderRadius: 2, backgroundColor: '#EEEFEF', textAlign: 'center' }}>
            <Typography variant="h6" component="div">
              Valor
            </Typography>
            <Typography variant="body1">
              {overallResult.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} sx={{ padding: 2, borderRadius: 2, backgroundColor: '#EEEFEF', textAlign: 'center' }}>
            <Typography variant="h6" component="div">
              Produtividade
            </Typography>
            <Typography variant="body1">
              {overallResult.productivity}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WrapperBox;