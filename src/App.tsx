import React from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Map from './Map';

const InitialPage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


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
