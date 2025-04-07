import { useEffect, useState } from 'react';
import { Search, Sort } from './components/Icons.tsx';
import Logo from './assets/logo.png';
import Map from './components/Map.tsx'

// libs
import axios from 'axios';

function App() {

  const [trucks, setTrucks] = useState<object[]>([]);
  const [harvesters, setHarvesters] = useState<object[]>([]);
  const [tractors, setTractors] = useState<object[]>([]);

  const fetchData = async () => {
    const equip = await axios.get('/data/equipment.json')
      .then((res) => {
        return (res.data);
      })
      .catch((err) => {
        console.error('Erro ao buscar JSON:', err);
      });

    const equipModel = await axios.get('/data/equipmentModel.json')
      .then((res) => {
        return (res.data);
      })
      .catch((err) => {
        console.error('Erro ao buscar JSON:', err);
      });

    const positionHistory = await axios.get('/data/equipmentPositionHistory.json')
      .then((res) => {
        return (res.data);
      })
      .catch((err) => {
        console.error('Erro ao buscar JSON:', err);
      });

    const state = await axios.get('/data/equipmentState.json')
      .then((res) => {
        return (res.data);
      })
      .catch((err) => {
        console.error('Erro ao buscar JSON:', err);
      });

    const stateHistory = await axios.get('/data/equipmentStateHistory.json')
      .then((res) => {
        return (res.data);
      })
      .catch((err) => {
        console.error('Erro ao buscar JSON:', err);
      });

    console.log("equip", equip)
    console.log("equipModel", equipModel)
    console.log("positionHistory", positionHistory)
    console.log("state", state)
    console.log("stateHistory", stateHistory)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className='container-title'>
        <img src={Logo} className='logo' alt='logo-aiko' title='logo-aiko'></img>
        <div className='container-search'>
          <input type="text" className='search' placeholder='Buscar equipamento' />
          <button className='container-icons position-icon-search' title='Buscar'>
            <Search></Search>
          </button>
        </div>
        <span> Equipamento Florestal</span>
      </div >

      <div className='container-details-map'>
        <Map></Map>

        <div className='container-details'>
          <h2>Estado atual</h2>
          <span className='status'>Operando</span>

          <h2>Histórico de estados</h2>
          <div className='border-container'>
            <div className='container-filters'>
              <select className='select-status'>
                <option value="operating">Operando</option>
                <option value="idle">Parado</option>
                <option value="maintenance">Manutenção</option>
              </select>

              <button className='container-icons' title='Ordenar' >
                <Sort></Sort>
              </button>
            </div>
            <ul>
              <li>
                <span>01/04/2025</span>
                <span>11:00</span>
                <span>Operando</span>
              </li>
              <li>
                <span>12/03/2025</span>
                <span>12:00</span>
                <span>Parado</span>
              </li>
              <li>
                <span>20/01/2025</span>
                <span>16:00</span>
                <span>Manutenção</span>
              </li>
              <li>
                <span>20/01/2025</span>
                <span>16:00</span>
                <span>Manutenção</span>
              </li>
              <li>
                <span>20/01/2025</span>
                <span>16:00</span>
                <span>Manutenção</span>
              </li>
              <li>
                <span>20/01/2025</span>
                <span>16:00</span>
                <span>Manutenção</span>
              </li>
              <li>
                <span>20/01/2025</span>
                <span>16:00</span>
                <span>Manutenção</span>
              </li>
              <li>
                <span>20/01/2025</span>
                <span>16:00</span>
                <span>Manutenção</span>
              </li>
              <li>
                <span>20/01/2025</span>
                <span>16:00</span>
                <span>Manutenção</span>
              </li>
              <li>
                <span>20/01/2025</span>
                <span>16:00</span>
                <span>Manutenção</span>
              </li>
            </ul>
          </div>

          <h2>Percentual de produtividade do equipamento</h2>
          <div className='border-container'>
            <div>
              <span>Produtividade:</span>
              <span>18h</span>
            </div>
            <div>
              <span>Percentual:</span>
              <span>65%</span>
            </div>
          </div>

          <h2>Ganho por equipamento</h2>
          <div className='border-container'>
            <div>
              <span>Por hora:</span>
              <span className='value-hour'>R$ 100,00</span>
            </div>

            <div>
              <span>Manutenção:</span>
              <span className='value-maintenance'>R$ 20,00</span>
            </div>

            <div>
              <span>Parado:</span>
              <span className='value-idle'>R$ 5,00</span>
            </div>

            <div>
              <span>Lucro:</span>
              <span className='value-gain'>R$ 920,00</span>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default App
