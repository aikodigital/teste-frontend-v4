import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import EquipmentPage from './pages/EquipmentPage.tsx'
import MapPage from './pages/MapPage.tsx'
import './index.css'

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <MapPage />
  },
  {
    path: '/equipment/:id',
    element: <EquipmentPage />
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
