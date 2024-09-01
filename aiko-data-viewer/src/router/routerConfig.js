import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { StateHistory } from '../pages/StateHistory'
import { Details } from '../pages/Details'
import { History } from '../pages/History'
import { MapContainer } from '../components/MapContainer'
import { ROUTES } from '../constants/routes'
import { NotFound } from '../pages/NotFound'

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
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default router
