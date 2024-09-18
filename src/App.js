import "./App.css";
import "leaflet/dist/leaflet.css";
import TableCustom from "./components/TableCustom";
import { EquipamentContext } from './Hooks/EquipementContext';
import { useContext } from "react";
import PopUpMaps from "./components/popUpMaps"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    const { equipaments, coodinateSelected, } = useContext(EquipamentContext);

  return (
    <>
    <TableCustom equipaments={equipaments}/>
    <PopUpMaps position={coodinateSelected}  />
    </>
  )
}

export default App;
