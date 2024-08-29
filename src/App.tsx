import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EquipmentDetailsPage from "./pages/EquipmentDetailsPage";


export default function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/equipment/:id" element={<EquipmentDetailsPage />} />
        </Routes>
      </div>
    </Router>
  )
}
