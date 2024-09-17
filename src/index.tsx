import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/pages/Home/index'; // Certifique-se de que Home é o componente principal
import './global.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
