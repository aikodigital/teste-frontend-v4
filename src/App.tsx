import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { EquipmentList } from './pages/EquipmentList';
import { EquipmentMap } from './pages/EquipmentMap';
import { EquipmentDetails } from './pages/EquipmentDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="x-screen h-screen bg-gray-100 flex flex-col overflow-x-hidden">
        <Navigation />
        <main className="grow">
          <Routes>
            <Route path="/" element={<EquipmentList />} />
            <Route path="/map" element={<EquipmentMap />} />
            <Route path="/equipment/:id" element={<EquipmentDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App