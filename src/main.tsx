import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.tsx';
import Welcome from './pages/Welcome.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/mapa" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
