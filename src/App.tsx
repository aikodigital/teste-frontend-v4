import React from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Map from './pages/map/Map';
import InitialPage from './pages/home/InitalPage';




const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<InitialPage/>} />
        <Route path='/map' element={<Map/>} />    
      </Routes>
    </BrowserRouter>
    
  );
}



export default AppRouter;
