import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { APIProvider } from '@vis.gl/react-google-maps';

import { mapsApiKey } from '@/config/env.tsx';

import App from './App.tsx';
import StatePage from './pages/State.tsx';
import HomePage from './pages/Home.tsx';
import RoutePage from './pages/Route.tsx';
import NotFoundPage from './pages/NotFound.tsx';

import "@/styles/global.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <APIProvider apiKey={mapsApiKey}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/state" element={<StatePage />} />
            <Route path="/route" element={<RoutePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </APIProvider>
  </StrictMode>,
);