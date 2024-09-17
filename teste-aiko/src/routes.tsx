
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Map from "./pages/Map/index";
import Trucks from "./pages/Trucks/index";
import MainPage from "./pages/MainPage";

export default function Router() {
  return (


    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}>
          <Route path='/trucks' element={<Trucks />} />
          <Route index element={<Map/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

//<Route path='/categoria/:nomeCategoria' element={<Categoria />} />