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

export type Positions = {
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
  status: string,
  formattedDate: string,
  formattedTime: string
}

type StateHistory = {
  equipmentId: string,
  states: States[],
  status: string
}

type StatesDurations = {
  Manutenção: number,
  Operando: number,
  Parado: number
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
  statusHistory: States[],
  statusDurations: StatesDurations
}

function App() {

  const [equips, setEquips] = useState<FilterEquips[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [currentEquip, setCurrentEquip] = useState<FilterEquips>({});
  const [ascendingOrder, setAscendingOrder] = useState<boolean>(false);

  let lucroTotal: number

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

      setEquips(filterEquips);
      setStates(state);

    } catch (error) {
      console.error(error)
    }

  }

  const calculateHoursState = (equipment: Equipment) => {
    const history = equipment;

    history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const durations: Record<string, number> = {};

    for (let i = 0; i < history.length - 1; i++) {
      const current = history[i];
      const next = history[i + 1];

      const start = new Date(current.date);
      const end = new Date(next.date);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

      if (!durations[current.status]) {
        durations[current.status] = 0;
      }

      durations[current.status] += hours;
    }

    // equipment.statusDurations = durations;

    return durations;
  };

  const getInfoCurrentEquip = (equip: FilterEquips) => {

    if (equip.id !== currentEquip.id) {
      setOpenDetails(true);
    } else {
      setOpenDetails(prev => !prev);
    }

    let copyEquip = { ...equip }

    copyEquip.statusHistory.forEach(item => {
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

      item.formattedDate = formattedDate
      item.formattedTime = formattedTime
    });

    copyEquip.statusDurations = calculateHoursState(copyEquip?.statusHistory)

    lucroTotal = currentEquip?.hourlyEarnings.reduce((acc, item) => {
      const duracao = currentEquip?.statusDurations?.[item.status] || 0;
      return acc + (item.value * duracao);
    }, 0);

    setCurrentEquip(copyEquip);

    console.log(copyEquip)
  }

  const sortDates = () => {

    setAscendingOrder(prev => !prev);

    currentEquip.statusHistory.sort((a, b) => {
      const dataA = new Date(a.date);
      const dataB = new Date(b.date);
      return ascendingOrder ? dataA - dataB : dataB - dataA;
    });

    currentEquip.statusHistory.sort((a, b) => a - b)
  }

  const filterState = (event: any) => {
    const id: string = event.target.value

    let findEquip: FilterEquips = equips.find(item => item.id === currentEquip.id) ?? {} as FilterEquips

    if (id === 'all') return setCurrentEquip(findEquip)

    const copyEquip = { ...findEquip }

    const filterStatus = copyEquip.statusHistory.filter(item => item.equipmentStateId === id)

    copyEquip.statusHistory = filterStatus
    setCurrentEquip(copyEquip)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {


  }, [currentEquip])

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
        {equips.length > 0 && <Map openDetails={openDetails} getInfoCurrentEquip={getInfoCurrentEquip} equips={equips} />}

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
                <select className='select-status' onChange={filterState}>
                  <option value="all">Todos status</option>
                  {states.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>

                <button className='container-icons' title='Ordenar' onClick={sortDates}>
                  <Sort></Sort>
                </button>
              </div>
              <ul>
                {currentEquip.statusHistory.map((item, index) => (
                  <li key={index}>
                    <span>{item.formattedDate}</span>
                    <span>{item.formattedTime}</span>
                    <span className={'value-' + item.status.toLowerCase()}>{item.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <h2>Percentual de produtividade do equipamento</h2>
            <div className='border-container'>
              <div>
                <span>Produtividade:</span>
                <span>{currentEquip?.statusDurations.Operando}h</span>
              </div>
              <div>
                <span>Percentual:</span>
                <span>{currentEquip?.statusDurations.Operando / 24 * 100}%</span>
              </div>
            </div>


            <h2>Ganho por equipamento</h2>
            <div className='border-container'>
              <span className='subtitle-earnings-equip'>Horas Totais por estados</span>
              <div>
                <span>Operando:</span>
                <span className='value-operando'>{currentEquip?.statusDurations.Operando}h</span>
              </div>

              <div>
                <span>Manutenção:</span>
                <span className='value-manutenção'>{currentEquip?.statusDurations.Manutenção}h</span>
              </div>

              <div>
                <span>Parado:</span>
                <span className='value-parado'>{currentEquip?.statusDurations.Parado}h</span>
              </div>

            </div>
            <div className='border-container'>
              <span className='subtitle-earnings-equip'> Valores por hora</span>

              {currentEquip.hourlyEarnings.map((item, index) => {
                const total = (currentEquip?.statusDurations?.[item.status] || 0) * item.value;

                return (
                  <div className='container-hours-total' key={index}>
                    <div>
                      <span>{item.status}:</span>
                      <span className={'value-' + item.status.toLowerCase()}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}
                      </span>
                    </div>

                    <div className='total-values-equip'>
                      <span>Total:</span>
                      <span className={'value-' + item.status.toLowerCase()}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div>
                <span>Lucro:</span>
                <span className='value-hour'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lucroTotal || 0)}</span>
              </div>

            </div>

          </div>
        )}

      </div>
    </>
  )
}

export default App
