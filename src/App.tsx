import React from "react";
import { EquipmentProvider } from "./contexts/equipment";
import { EquipmentDetailsProvider } from "./contexts/equipmentDetailsContext";
import { Home } from "./pages/home";

const App: React.FC = () => {
  return (
    <EquipmentProvider>
      <EquipmentDetailsProvider>
        <Home />
      </EquipmentDetailsProvider>
    </EquipmentProvider>
  );
};

export default App;