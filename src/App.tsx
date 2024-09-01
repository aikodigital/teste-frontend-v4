import { Title, Footer } from './styles/styles';
import Map from './components/map/Map';
import InputForm from './components/inputForm/Form';

function App() {
    return (
      <div className='App'>
        <Title>Mapa de monitoração de operação</Title>
        <InputForm />
        <Map />
          <Footer>
            Developed by: <a href="https://www.linkedin.com/in/dev-alexandre-pereira/" target="_blank" rel="noopener noreferrer">Alê Pereira</a>
        </Footer>
      </div>
    );
}

export default App;
