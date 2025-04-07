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
                <IconSort></IconSort>
              </button>
            </div>
            <ul>
              <li>
                <span>01/04/2025</span>
                <span>11:00</span>
                <span>Operando</span>
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
              <span>R$ 100,00</span>
            </div>

            <div>
              <span>Manutenção:</span>
              <span>R$ 20,00</span>
            </div>

            <div>
              <span>Lucro:</span>
              <span>R$ 920,00</span>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default App
