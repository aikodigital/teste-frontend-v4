import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PositionHistory } from './pages/PositionHistory'
import { StateHistory } from './pages/StateHistory'
import { Home } from './pages/Home'
import { MapContainer } from './components/MapContainer'
import { Details } from './pages/Details'
import { ROUTES } from './constants/routes'
import { History } from './pages/History'
const root = ReactDOM.createRoot(document.getElementById('root'))

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
    children: [
      {
        path: ROUTES.HOME,
        element: <MapContainer />,
      },
      {
        path: 'position/details/:id',
        element: <PositionHistory />,
      },
      {
        path: ROUTES.STATE_HISTORY,
        element: <StateHistory />,
      },
      {
        path: ROUTES.HISTORY,
        element: <History />,
      },
      {
        path: ROUTES.DETAILS,
        element: <Details />,
      },
    ],
  },
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

