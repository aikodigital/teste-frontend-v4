
import EquipmentsData from "./components/EquipamentsData/EquipamentsData";
import Maps from "./components/maps/Maps";
import "./global.css";
import HeaderMain from "./layouts/HeaderMain";
import { Provider } from "./context/ContextDataEquipments";

function App() {
  return (
    <Provider>
      <div className="flex flex-col h-screen max-h-screen">
          <HeaderMain />
          <div className="w-full grid grid-cols-2 p-4 justify-between">
              <Maps position={[51.505, -0.09]} />
              <EquipmentsData />
          </div>
      </div>
    </Provider>
  );
}

export default App;
