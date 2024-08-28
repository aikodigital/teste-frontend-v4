import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import EquipmentPage from './pages/EquipmentPage.tsx'
// import MapPage from './pages/MapPage.tsx'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <EquipmentPage />
    </QueryClientProvider>
  </StrictMode>
)
