import Map from './components/MapComponent/MapComponent'
import Container from './components/Container/Container';
import './App.scss';
import logoaiko from '../src/images/aiko.png'

function App() {
  return (
    <Container>
      <div className="App">
        <Container>
          <img className='logo-aiko' src={logoaiko} alt='logo aiko' />
        </Container>
        <Container>
          <h1>Monitoramento de Equipamentos</h1>
          <Map />
        </Container>
      </div>
    </Container>
  );
}
export default App;
