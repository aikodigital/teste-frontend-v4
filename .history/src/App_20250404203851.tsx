import './App.css'
import Logo from './assets/logo.png';
import IconSort from './assets/icon-sort.svg';
import Map from './components/Map.tsx'

function App() {

  return (
    <>
      <div className='container-title'>
        <img src={Logo} className='logo' alt='logo-aiko' title='logo-aiko'></img>
        <input type="text" className='search' placeholder='Buscar equipamento' />
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M640-560v-126 126ZM174-132q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v337q-15-23-35.5-42T760-528v-204l-120 46v126q-21 0-41 3.5T560-546v-140l-160-56v523l-226 87Zm26-96 120-46v-468l-120 40v474Zm440-12q34 0 56.5-20t23.5-60q1-34-22.5-57T640-400q-34 0-57 23t-23 57q0 34 23 57t57 23Zm0 80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 43.5T778-238l102 102-56 56-102-102q-18 11-38.5 16.5T640-160ZM320-742v468-468Z" /></svg>
        <span>Equipamento Florestal</span>
      </div>

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

              <button>
                <img src={IconSort} alt="icone para ordenar os status" title='ícone para ordenar' />
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
