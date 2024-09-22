import Home from "./pages/Home";
import { EquipmentProvider } from "./context/EquipmentContext";

function App() {
  return (
    <div className="App flex flex-col h-screen">
      <EquipmentProvider>
        <Home />
      </EquipmentProvider>
    </div>
  );
}

export default App;
