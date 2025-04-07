import { useState, useEffect } from "react";
import Map from "./components/Map"
import Header from "./components/Header"
import EquipmentSummary from "./components/EquipmentSummary"
import EquipmentTable from "./components/EquipmentTable"
import Filter from "./components/Filter"
import { EquipmentProvider } from "./contexts/EquipmentContext"
import EquipmentDetails from "./components/EquipmentDetails"
import WelcomeScreen from "./components/WelcomeScreen"

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Remove completamente o componente de boas-vindas após a animação terminar
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3500); // 3.5 segundos (2.5s de exibição + 1s de animação)

    return () => clearTimeout(timer);
  }, []);

  return (
    <EquipmentProvider>
      {showWelcome && <WelcomeScreen />}
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-[30%] lg:w-[28%] space-y-4">
              <Filter />
              <div className="relative flex flex-col space-y-4">
                <EquipmentSummary />
                <EquipmentTable />
                <div className="absolute top-0 left-0 right-0 z-20">
                  <EquipmentDetails />
                </div>
              </div>
            </div>
            <div className="w-full md:w-[70%] lg:w-[72%] bg-white rounded-lg shadow-sm p-4 flex flex-col">
              <div className="flex-grow h-[calc(100vh-200px)] md:h-auto overflow-hidden">
                <Map />
              </div>
            </div>
          </main>
        </div>
      </div>
    </EquipmentProvider>
  );
}

export default App
