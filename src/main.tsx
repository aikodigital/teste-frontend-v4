import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { EquipmentProvider } from './context/EquipmentContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EquipmentProvider>
      <App />
    </EquipmentProvider>
  </StrictMode>,
);
