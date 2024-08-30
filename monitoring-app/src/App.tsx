import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setEquipments, setPositions, setStates, setStateHistory } from './store/equipmentSlice';
import { fetchData } from './services/api';
import Map from './components/Map';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      const { equipment, positions, states, stateHistory } = await fetchData();
      dispatch(setEquipments(equipment));
      dispatch(setPositions(positions));
      dispatch(setStates(states));
      dispatch(setStateHistory(stateHistory));
    };

    loadData();
  }, [dispatch]);

  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center my-4">Monitoramento de Equipamentos</h1>
      <Map />
    </div>
  );
}

export default App;