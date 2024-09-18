import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import EquipmentMap from './components/EquipmentMap/EquipmentMap';
import Navbar from './components/Navbar/Navbar';
import EquipmentFilter from './components/Filters/EquipmentFilter';
import ModelFilter from './components/Filters/ModelFilter';
import StatusFilter from './components/Filters/StatusFilter';
import { useEffect, useState } from 'react';
import { IEquipment } from './types/equipment';
import { prepareEquipments } from './components/PrepareData/PrepareData';
import EquipmentHistory from './components/EquipmentHistory/EquipmentHistory';

const equipements: IEquipment[] = prepareEquipments();

function App() {
  const [selectedFilters, setSelectedFilters] = useState<String[]>([]);
  const [filteredEquipments, setFilteredEquipments] = useState<IEquipment[]>([]);
  const [equipmentHistory, setEquipmentHistory] = useState<IEquipment>();

  useEffect(() => {
    if (selectedFilters.length > 0) {
      setFilteredEquipments(
        equipements.filter(equipment =>
          selectedFilters.includes(equipment.id) ||
          selectedFilters.includes(equipment.equipmentModelId) ||
          selectedFilters.includes(equipment.state?.id)
        )
      );
    } else {
      setFilteredEquipments(equipements);
    }
  }, [selectedFilters]);

  return (
    <div className='container'>
      <Navbar />
      <div className="row mt-3 d-inline-flex">
        <EquipmentFilter setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters} />
        <ModelFilter setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters} />
        <StatusFilter setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters} />
      </div>
      <EquipmentMap equipments={filteredEquipments} setEquipmentHistory={setEquipmentHistory} />
      <EquipmentHistory equipment={equipmentHistory} />
    </div >
  );
}

export default App;
