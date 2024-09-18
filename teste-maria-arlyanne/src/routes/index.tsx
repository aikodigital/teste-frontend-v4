import { Route, Routes } from "react-router-dom"
import EquipmentLocation from "../pages/EquipmentLocation";
import EquipmentListing from "../pages/EquipmentListing";
import EquipamentPositions from "../pages/EquipmentListing/EquipamentPosition";


const RouteApp = () => {
    return (
        <Routes>
            <Route path="/" element={<EquipmentLocation/>}></Route>
            <Route path="/equipmentlisting" element={<EquipmentListing/>}/>
            <Route path="/equipamentpositions/:id" element={<EquipamentPositions/>}/>
            
        </Routes>
    )
}
export default RouteApp;
