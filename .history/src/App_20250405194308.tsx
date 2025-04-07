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

  type Equip = {
    equipmentModelId: string,
    id: string,
    name: string
  }

  type HourlyEarningsEntry = {
    equipmentStateId: string;
    value: number;
  };

  type EquipModel = {
    hourlyEarnings: HourlyEarningsEntry[],
    id: string,
    name: string
  }

  type Equipment = {
    equipmentModelId: string,
    id: string,
    name: string
  }

  const fetchData = async () => {
    try {
      const { data: equip }: { data: Equip[] } = await axios.get('/data/equipment.json');
      const { data: equipModel }: { data: EquipModel[] } = await axios.get('/data/equipmentModel.json');
      const { data: positionHistory }: { data: object[] } = await axios.get('/data/equipmentPositionHistory.json');
      const { data: state }: { data: object[] } = await axios.get('/data/equipmentState.json');
      const { data: stateHistory }: { data: object[] } = await axios.get('/data/equipmentStateHistory.json');

      const filterEquips = equip.reduce((acc, item) => {

        const model = equipModel.find(model => model.id === item.equipmentModelId);

        const position = positionHistory.find(position => position.equipmentId === item.id);

        const lastPosition = position.positions.reduce((maisRecente, atual) => {
          return new Date(atual.date) > new Date(maisRecente.date) ? atual : maisRecente;
        });

        const status = stateHistory.find(state => state.equipmentId === item.id);

        status.states.forEach(element => {
          element.status = state.find(stats => stats.id === element.equipmentStateId).name
        });

        model.hourlyEarnings.forEach(element => {
          element.status = state.find(stats => stats.id === element.equipmentStateId).name
        });

        const newItem = {
          ...item,
          nameEquip: model?.name || '',
          hourlyEarnings: model?.hourlyEarnings || 0,
          positionHistory: position?.positions || [],
          currentPosition: lastPosition,
          statusHistory: status?.states || [],
        };

        acc.push(newItem);
        return acc;
      }, []);

      const truksFilter = filterEquips.filter(equips => equips.equipmentModelId === "a3540227-2f0e-4362-9517-92f41dabbfdf");
      const harvesterFilter = filterEquips.filter(equips => equips.equipmentModelId === "a4b0c114-acd8-4151-9449-7d12ab9bf40f");
      const tractorsFilter = filterEquips.filter(equips => equips.equipmentModelId === "9c3d009e-0d42-4a6e-9036-193e9bca3199");

      setTrucks(truksFilter)
      setHarvesters(harvesterFilter)
      setTractors(tractorsFilter)

      console.log(filterEquips)
      console.log(positionHistory)

    } catch (error) {
      console.error(error)
    }

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
            <span className='subtitle-earnings-equip'>Horas Totais por estados</span>
            <div>
              <span>Operando:</span>
              <span className='value-hour'>10h</span>
            </div>

            <div>
              <span>Manutenção:</span>
              <span className='value-maintenance'>5h</span>
            </div>

            <div>
              <span>Parado:</span>
              <span className='value-idle'>2h</span>
            </div>

          </div>
          <div className='border-container'>
            <span className='subtitle-earnings-equip'> Valores por hora</span>
            <div className='container-hours-total'>
              <div>
                <span>Operando:</span>
                <span className='value-hour'>R$ 100,00</span>
              </div>

              <div className='total-values-equip'>
                <span>Total:</span>
                <span className='value-hour'>R$ 1000,00</span>
              </div>

            </div>

            <div>
              <span>Manutenção:</span>
              <span className='value-maintenance'>R$ 20,00</span>
            </div>
            <div className='total-values-equip'>
              <span>Total:</span>
              <span className='value-hour'>R$ 1000,00</span>
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
