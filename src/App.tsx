import React from 'react';
import Home from './pages/Home';
import aiko from './assets/aiko.png';
import { Container, Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <Container maxWidth={false} className="flex justify-center flex-col">
      <Box className="p-8 flex items-center justify-center">
        <img src={aiko} alt="Aiko" className="w-22 h-14" />
      </Box>
      <Home />
    </Container>
  );
};

export default App;
