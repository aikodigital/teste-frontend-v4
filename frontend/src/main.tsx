/* eslint-disable react/react-in-jsx-scope */
import 'primereact/resources/themes/saga-blue/theme.css';  // Importa o tema do PrimeReact
import 'primereact/resources/primereact.min.css';  // Importa os estilos principais do PrimeReact

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MapComponent } from './containers/Map'

import './styles.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MapComponent />
  </StrictMode>
)
