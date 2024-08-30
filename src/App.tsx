import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Map from './pages/map/Map';
import InitialPage from './pages/home/InitalPage';

const theme = createTheme({});


const AppRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<InitialPage/>} />
          <Route path='/map' element={<Map/>} />    
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    
  );
}



export default AppRouter;
