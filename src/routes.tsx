import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageEquipmentStateHistory from './pages/EquipmentStateHistory/PageEquipmentStateHistory'
import Home from './pages/Home/Home'

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/equipment-state-history/:id'
          element={<PageEquipmentStateHistory />}
        />
      </Routes>
    </BrowserRouter>
  )
}
