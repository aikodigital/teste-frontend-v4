import './assets/scss/styled.scss';
import { EquipmentsProvider } from './context/equipment';
import Router from './routes';
import NavMenu from './components/navmenu';
import MapEquipments from './components/mapEquipments';

function App() {
  return (
    <>
    <EquipmentsProvider>
      <Router/>
    </EquipmentsProvider>
    </>
  );
}

export default App;
