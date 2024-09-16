import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Cria o root
root.render(<App />); // Renderiza o componente principal
