import { BrowserRouter, Routes, Route } from "react-router-dom";


import Header from './components/Header'
import Equipamentos from './pages/Equipamentos'
import Map from './pages/Map'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/equipamentos" element={<Equipamentos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
