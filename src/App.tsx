import { useEffect, useState } from 'react';
import './App.scss';
import Leaflet from './components/Leaflet/Leaflet';
import Sidebar from './components/Sidebar/Sidebar';
import { useContextApi } from './context/ContextApi';
import equipamentJSON from './data/equipment.json';
import equipamentModelJSON from './data/equipmentModel.json';
import equipamentPositionJSON from './data/equipmentPositionHistory.json';
import equipamentState from './data/equipmentState.json';
import equipamentStateHistory from './data/equipmentStateHistory.json';
import Modal from './components/Modal/Modal';

type IFilterSelect = {
  value: string;
  label: string;
};

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [equipIdSelect, setEquipIdSelect] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [filterSelect, setFilterSelect] = useState<IFilterSelect | null>(null);

  const {
    setEquipaments,
    setEquipamentsModel,
    setEquipamentPositionHistory,
    setEquipamentsState,
    setEquipamentsStateHistory,
    equipamentsPositionHistory,
    equipaments,
    equipamentsStateHistory,
  } = useContextApi();

  useEffect(() => {
    setEquipaments(equipamentJSON);
    setEquipamentsModel(equipamentModelJSON);
    setEquipamentPositionHistory(equipamentPositionJSON);
    setEquipamentsState(equipamentState);
    setEquipamentsStateHistory(equipamentStateHistory);
  }, []);

  const filterEquip = equipaments.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEquipIds = filterEquip.map((item) => item.id);

  const filterEquipPosition =
    filteredEquipIds.length > 0
      ? equipamentsPositionHistory.filter((item) =>
          filteredEquipIds.includes(item.equipmentId)
        )
      : equipamentsPositionHistory;

  const filterEquipState =
    filterSelect === null || filterSelect.value === 'all'
      ? equipamentsStateHistory
      : equipamentsStateHistory.filter(
          (item) =>
            item.states[item.states.length - 1].equipmentStateId ===
            filterSelect.value
        );

  const filterEquipStateIds = filterEquipState.map((item) => item.equipmentId);

  const intersection = filterEquipPosition.filter((item) =>
    filterEquipStateIds.includes(item.equipmentId)
  );

  console.log('equips: ', filterEquipState);
  return (
    <div className="App">
      <Sidebar
        search={search}
        setSearch={setSearch}
        filterSelect={filterSelect}
        setFilterSelect={setFilterSelect}
      />
      <div className="container-map">
        <Leaflet
          equipPositionHistory={intersection}
          showModal={() => setShowModal(true)}
          idEquipSelect={setEquipIdSelect}
        />
        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            equipIdSelect={equipIdSelect}
          />
        )}
      </div>
    </div>
  );
}

export default App;
