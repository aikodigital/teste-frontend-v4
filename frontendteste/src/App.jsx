import Dashboard from './pages/Dashboard/Dashboard'
import EquipmentDetails from './pages/EquipmentDetails/EquipmentDetails';
import './App.css'

import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/equipments/:id" element={<EquipmentDetails />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
