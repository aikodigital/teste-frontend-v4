import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import aikoLogo from "./assets/aiko.png";
import Filter from './Components/Filter';
import Maps from './Components/Maps.js';
// import { DataProvider } from './data/DataContext';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src={aikoLogo} alt="logo-aiko" id='aikoLogo'/>
        </header>

        <div id="container" className='container rounded'>
          <Filter />
          <Maps />
        </div>

        <footer>
          <span>Feito por Vinicius Rodrigues</span>
        </footer>
      </div>
  );
}

export default App;