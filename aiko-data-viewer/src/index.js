import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PositionHistory } from './pages/PositionHistory'
import { StateHistory } from './pages/StateHistory'
import { Home } from './pages/Home'
const root = ReactDOM.createRoot(document.getElementById('root'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'position/details/:id',
    element: <PositionHistory />,
  },
  {
    path: 'state/details/:id',
    element: <StateHistory />,
  },
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

