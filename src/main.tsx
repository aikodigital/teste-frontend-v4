import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ModeloProvider from './context/ModeloProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModeloProvider>
      <App />
    </ModeloProvider>
  </StrictMode>,
)
