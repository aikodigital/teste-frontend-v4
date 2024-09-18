import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Equipment from "./components/Equipment";
import EquipmentList from "./components/EquipmentList";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { EquipmentsProvider } from "./contexts/EquipmentsContext";
import { MapProvider } from "./contexts/MapContext";
const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
  return (
    <>
      <EquipmentsProvider>
        <MapProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Navigate replace to="app" />} />
                <Route path="app" element={<AppLayout />}>
                  <Route index element={<Navigate replace to="equipments" />} />
                  <Route path="equipments" element={<EquipmentList />} />
                  <Route path="equipments/:id" element={<Equipment />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </MapProvider>
      </EquipmentsProvider>
    </>
  );
}

export default App;
