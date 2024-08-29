import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import 'mapbox-gl/dist/mapbox-gl.css'; // Certifique-se de que o CSS do Mapbox GL está sendo importado
import mapboxgl from 'mapbox-gl'; // Importa o mapbox-gl

// Substitua pela sua chave de acesso do Mapbox
mapboxgl.accessToken = 'sk.eyJ1Ijoid2lsbGlhbjQ1NCIsImEiOiJjbTA4bXpvdjExa2xtMmxwd3Qza2NtaTZiIn0.lbY5JgA9-1zK_mtE7UJ5nw';
//mapboxgl.accessToken = 'IwLYwEPhmOKKkzY6BYvL'

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);  // Cria a raiz da aplicação

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);