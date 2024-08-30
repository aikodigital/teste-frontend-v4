import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import {BrowserRouter , Routes , Route} from 'react-router-dom'
import EquipamentPositionMap from './pages/equipament-position-map/EquipamentPositionMap';
import InitialPage from './pages/home/InitalPage';
import AllEquipamentsMap from './pages/all-equipaments-map/AllEquipamentsMap';

const theme = createTheme({});


const AppRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/map/:equipmentId' element={<EquipamentPositionMap/>} />
          <Route path='/map/' element={<AllEquipamentsMap/>} />   
          <Route path='/' element={<InitialPage/>} />
 
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    
  );
}



export default AppRouter;
