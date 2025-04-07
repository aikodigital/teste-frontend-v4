import { useEffect, useState } from 'react';
import { Search, Sort } from './components/Icons.tsx';
import Logo from './assets/logo.png';
import Map from './components/Map.tsx'

// libs
import axios from 'axios';

type Equip = {
  equipmentModelId: string,
  id: string,
  name: string
}

type HourlyEarningsEntry = {
  equipmentStateId: string;
  value: number;
  status: string
};

type EquipModel = {
  hourlyEarnings: HourlyEarningsEntry[],
  id: string,
  name: string
}

type Positions = {
  date: string,
  lat: number,
  lon: number
}

type PositionHistory = {
  equipmentId: string,
  positions: Positions[]
}

type State = {
  color: string,
  id: string,
  name: string
}

type States = {
  date: string,
  equipmentStateId: string,
  status: string
}

type StateHistory = {
  equipmentId: string,
  states: States[],
  status: string
}

export type FilterEquips = {
  currentPosition: Positions,
  currentState: States,
  equipmentModelId: string,
  hourlyEarnings: HourlyEarningsEntry[],
  id: string,
  name: string,
  nameEquip: string,
  positionHistory: PositionHistory[],
  statusHistory: States[]
}

function App() {

  const [equips, setEquips] = useState<FilterEquips[]>([]);
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [currentEquip, setCurrentEquip] = useState<FilterEquips>({});

  const fetchData = async () => {
    try {
      const { data: equip }: { data: Equip[] } = await axios.get('/data/equipment.json');
      const { data: equipModel }: { data: EquipModel[] } = await axios.get('/data/equipmentModel.json');
      const { data: positionHistory }: { data: PositionHistory[] } = await axios.get('/data/equipmentPositionHistory.json');
      const { data: state }: { data: State[] } = await axios.get('/data/equipmentState.json');
      const { data: stateHistory }: { data: StateHistory[] } = await axios.get('/data/equipmentStateHistory.json');

      const filterEquips = equip.reduce<FilterEquips[]>((acc, item) => {

        const model = equipModel.find(model => model.id === item.equipmentModelId);

        const position = positionHistory.find(position => position.equipmentId === item.id);

        const lastPosition = position?.positions.reduce((maisRecente, atual) => {
          return new Date(atual.date) > new Date(maisRecente.date) ? atual : maisRecente;
        });

        const status = stateHistory.find(state => state.equipmentId === item.id);

        const lastState = status?.states.reduce((maisRecente, atual) => {
          return new Date(atual.date) > new Date(maisRecente.date) ? atual : maisRecente;
        });

        status?.states.forEach(element => {
          element.status = state?.find(stats => stats?.id === element?.equipmentStateId)?.name ?? ''
        });

        model?.hourlyEarnings.forEach(element => {
          element.status = state.find(stats => stats?.id === element?.equipmentStateId)?.name ?? ''
        });

        const newItem: FilterEquips = {
          ...item,
          nameEquip: model?.name || '',
          hourlyEarnings: model?.hourlyEarnings || [],
          positionHistory: [{
            equipmentId: item.id,
            positions: position?.positions || []
          }],
          currentPosition: lastPosition || {} as Positions,
          statusHistory: status?.states || [],
          currentState: lastState || {} as States
        };


        acc.push(newItem);
        return acc;
      }, []);

      // const truksFilter = filterEquips.filter(equips => equips?.equipmentModelId === "a3540227-2f0e-4362-9517-92f41dabbfdf");
      // const harvesterFilter = filterEquips.filter(equips => equips?.equipmentModelId === "a4b0c114-acd8-4151-9449-7d12ab9bf40f");
      // const tractorsFilter = filterEquips.filter(equips => equips?.equipmentModelId === "9c3d009e-0d42-4a6e-9036-193e9bca3199");

      // setTrucks(truksFilter)
      // setHarvesters(harvesterFilter)
      // setTractors(tractorsFilter)
      setEquips(filterEquips)

    } catch (error) {
      console.error(error)
    }

  }

  const getEquipInfo = (equip: FilterEquips) => {

    if (equip.id !== currentEquip.id) {
      setOpenDetails(true);
    } else {
      setOpenDetails(prev => !prev);
    }

    let teste = { ...equip }

    teste.statusHistory.forEach(item => {
      const dateObj = new Date(item.date);

      const formattedDate = dateObj.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "America/Sao_Paulo"
      });

      const formattedTime = dateObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Sao_Paulo"
      });

      item.formattedDate
      item.formattedTime
    });
    setCurrentEquip(equip);

    // console.log(equip);
    console.log(teste);
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
        {equips.length > 0 && <Map getEquipInfo={getEquipInfo} equips={equips} />}

        {openDetails && (

          <div className='container-details'>

            <h2>Equipamento</h2>
            <div className='border-container'>
              <div>
                <span>Nome:</span>
                <span>{currentEquip.nameEquip}</span>
              </div>
              <div>
                <span>ID:</span>
                <span>{currentEquip.name}</span>
              </div>
            </div>

            <h2>Estado atual</h2>
            <span className='status'>{currentEquip.currentState.status}</span>

            <h2>Histórico de estados</h2>
            <div className='border-container'>
              <div className='container-filters'>
                <select className='select-status'>
                  <option value="operating">Todos status</option>
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
                <span className='value-operando'>10h</span>
              </div>

              <div>
                <span>Manutenção:</span>
                <span className='value-manutenção'>5h</span>
              </div>

              <div>
                <span>Parado:</span>
                <span className='value-parado'>2h</span>
              </div>

            </div>
            <div className='border-container'>
              <span className='subtitle-earnings-equip'> Valores por hora</span>

              {currentEquip.hourlyEarnings.map((item, index) => (
                <div className='container-hours-total' key={index}>
                  <div>
                    <span>{item.status}:</span>
                    <span className={'value-' + item.status.toLowerCase()}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}</span>
                  </div>

                  <div className='total-values-equip'>
                    <span>Total:</span>
                    <span className={'value-' + item.status.toLowerCase()}>R$ 1000,00</span>
                  </div>
                </div>
              ))}

              <div>
                <span>Lucro:</span>
                <span className='value-hour'>R$ 920,00</span>
              </div>

            </div>

          </div>
        )}

      </div>
    </>
  )
}

export default App
