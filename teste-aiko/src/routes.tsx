
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Map from "./pages/Map/Map";
import Fleet from "./pages/Fleet/Fleet";
import MainPage from "./pages/MainPage/MainPage";
import Truck from "./pages/Truck/Truck";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}>
          <Route index element={<Map/>} />
          <Route path='/fleet' element={<Fleet />} />
          <Route path='/truck/:equipmentId' element={<Truck/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}